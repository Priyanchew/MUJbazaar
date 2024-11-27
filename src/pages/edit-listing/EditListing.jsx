import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';

import TextInput from '../../components/TextInput';
import TextAreaInput from '../../components/TextAreaInput';
import ToggleInput from '../../components/ToggleInput';
import RadioInput from '../../components/RadioInput';
import FileInput from '../../components/FileInput';
import UploadedImageThumb from '../../components/UploadedImageThumb';

import useAbortableEffect from '../../hooks/useAbortableEffect';

import validationSchema from './validationSchema';
import { updateListing, deleteUploadedImage, deleteSelectedImage } from './editListingFunctions';
import { db, auth } from '../../firebase.config';

function EditListing() {
  const [imageThumbs, setImageThumbs] = useState([]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { listingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Edit listing | Rent or Sell';
  }, []);

  useAbortableEffect(
    (status) => {
      const getListing = async () => {
        try {
          const docRef = doc(db, 'listings', listingId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (!status.aborted) {
              setListing(data);
            }
          } else {
            throw new Error('Listing does not exist');
          }
        } catch (error) {
          if (!status.aborted) {
            setError(error.message);
          }
        } finally {
          if (!status.aborted) {
            setLoading(false);
          }
        }
      };

      getListing();
    },
    [listingId]
  );

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error('You cannot edit that listing');
      navigate('/');
    }
  }, [listing]);

  const onDropHanlder = (acceptedFiles, setFieldValue) => {
    setImageThumbs(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
    setFieldValue('images', acceptedFiles);
  };

  const onSubmit = async (values) => {
    await updateListing(values, listingId);
  };

  if (loading) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>Loading....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen max-w-7xl mx-auto px-3 lg:py-24 md:py-20 py-14">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Edit listing</h1>
        <div className="max-w-3xl mx-auto">
          <Formik initialValues={listing} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting, values, resetForm, setFieldValue }) => {
              return (
                <Form className="space-y-4">
                  <div>
                    <span id="listing-type">Listing type</span>
                    <div
                      role="group"
                      aria-labelledby="listing-type"
                      className="flex max-w rounded-lg overflow-hidden border mt-2 border-gray-300">
                      <button
                        type="button"
                        id="forSale"
                        onClick={() => setFieldValue('type', 'sale')}
                        className={`w-1/2 py-2 text-center ${
                          values.type === 'sale'
                            ? 'btn-primary text-white'
                            : 'bg-white text-gray-700'
                        }`}>
                        For Sale
                      </button>
                      <button
                        type="button"
                        id="forRent"
                        onClick={() => setFieldValue('type', 'rent')}
                        className={`w-1/2 py-2 text-center ${
                          values.type === 'rent'
                            ? 'btn-primary text-white'
                            : 'bg-white text-gray-700'
                        }`}>
                        For Rent
                      </button>
                    </div>
                  </div>
                  <div>
                    <TextInput label="Title" id="title" name="title" type="text" />
                  </div>
                  <div>
                    <TextAreaInput label="Description" id="description" name="description" />
                  </div>
                  <div>
                    <TextInput
                      label="Price (in USD)"
                      id="regularPrice"
                      name="regularPrice"
                      type="number"
                      min="0"
                    />
                  </div>
                  <FileInput
                    maxSize={2097152}
                    accept="image/jpg, image/png, image/jpeg"
                    onDrop={(acceptedFiles) => onDropHanlder(acceptedFiles, setFieldValue)}
                    dropZoneText="Select images (Max file size: 2MB)"
                    id="images"
                    name="images"
                    label="Upload listing images (.jpg, .png)"
                  />

                  {imageThumbs.length > 0 && (
                    <ul className="flex items-center justify-start flex-wrap gap-4 mt-4">
                      {imageThumbs.map((file) => (
                        <li key={uuidv4()} className="flex-shrink-0 relative w-24 h-24">
                          <UploadedImageThumb
                            src={file.preview}
                            onClick={() =>
                              deleteSelectedImage(
                                imageThumbs,
                                file.path,
                                setFieldValue,
                                setImageThumbs
                              )
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  )}

                  {values.imgUrls.length > 0 && (
                    <div>
                      <p>Current images:</p>
                      <ul className="flex items-center justify-start flex-wrap gap-4 mt-4">
                        {values.imgUrls.map((url) => (
                          <li key={uuidv4()} className="flex-shrink-0 relative w-24 h-24">
                            <UploadedImageThumb
                              src={url}
                              onClick={() =>
                                deleteUploadedImage(setFieldValue, url, values.imgUrls)
                              }
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="btn btn-neutral btn-block mt-3 mx-0"
                      onClick={() => resetForm()}
                      disabled={isSubmitting}>
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary md:mt-3 btn-block mx-0"
                      disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </main>
  );
}

export default EditListing;
