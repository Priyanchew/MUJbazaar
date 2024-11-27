import { useState } from 'react';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import TextInput from '../../components/TextInput';
import TextAreaInput from '../../components/TextAreaInput';
import ToggleInput from '../../components/ToggleInput';
import RadioInput from '../../components/RadioInput';
import FileInput from '../../components/FileInput';
import UploadedImageThumb from '../../components/UploadedImageThumb';

import validationSchema from './validationSchema';
import initialValues from './initalValues';
import { submitListingData, deleteSelectedImage } from './createListingFunctions';

function CreateListing() {
  const [imageThumbs, setImageThumbs] = useState([]);
  const navigate = useNavigate();

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
    const listingId = await submitListingData(values);
    if (listingId) {
      navigate(`/listing/${listingId}`);
    }
  };

  return (
    <main className="min-h-screen max-w-7xl px-3 mx-auto">
      <section className="lg:py-24 md:py-20 py-14">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8">Create listing</h1>
        <div className="max-w-3xl mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
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
                      label="Price (in INR)"
                      id="regularPrice"
                      name="regularPrice"
                      type="number"
                      min="0"
                    />
                  </div>
                  <div>
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
                  </div>
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

export default CreateListing;
