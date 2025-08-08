import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { PunchDefinition } from 'models/Punches/Punches';
import { validationSchema } from 'helpers/Punches';
import axiosInstance from 'utils/helpers/AxiosInstance';

interface PunchFormProps {
  punch: PunchDefinition;
  refetchPunches: () => Promise<void>;
  handleCloseEdit: () => void;
}

const PunchForm = ({ punch, refetchPunches, handleCloseEdit }: PunchFormProps) => {
  const initialValues: PunchDefinition = {
    id: punch.id,
    name: punch.name || '',
    korean: punch.korean || '',
    description: punch.description || '',
    belt: punch.belt || '',
    beltColor: punch.beltColor || '',
    technique: punch.technique || '',
    bodyMechanics: punch.bodyMechanics || '',
    keyPoints: punch.keyPoints || [],
    commonMistakes: punch.commonMistakes || [],
    applications: punch.applications || [],
    targetAreas: punch.targetAreas || [],
  };

  const onSubmit = async (values: PunchDefinition) => {
    await axiosInstance.patch(`/punches/${values.id}`, values);
    await refetchPunches();
    handleCloseEdit();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          {/* Basic fields */}
          <div>
            <label htmlFor='name'>Name</label>
            <Field id='name' name='name' placeholder='Name' />
            <div className='error'>
              <ErrorMessage name='name' />
            </div>
          </div>

          <div>
            <label htmlFor='korean'>Korean</label>
            <Field id='korean' name='korean' placeholder='Korean name' />
            <div className='error'>
              <ErrorMessage name='korean' />
            </div>
          </div>

          <div>
            <label htmlFor='description'>Description</label>
            <Field
              as='textarea'
              id='description'
              name='description'
              placeholder='Description'
              rows={3}
            />
            <div className='error'>
              <ErrorMessage name='description' />
            </div>
          </div>

          <div>
            <label htmlFor='belt'>Belt</label>
            <Field id='belt' name='belt' placeholder='e.g., 8th Gup' />
            <div className='error'>
              <ErrorMessage name='belt' />
            </div>
          </div>

          <div>
            <label htmlFor='beltColor'>Belt Color</label>
            <Field id='beltColor' name='beltColor' placeholder='e.g., Yellow' />
            <div className='error'>
              <ErrorMessage name='beltColor' />
            </div>
          </div>

          <div>
            <label htmlFor='technique'>Technique</label>
            <Field id='technique' name='technique' placeholder='Technique type' />
            <div className='error'>
              <ErrorMessage name='technique' />
            </div>
          </div>

          <div>
            <label htmlFor='bodyMechanics'>Body Mechanics</label>
            <Field
              as='textarea'
              id='bodyMechanics'
              name='bodyMechanics'
              placeholder='Explain body mechanics'
              rows={3}
            />
            <div className='error'>
              <ErrorMessage name='bodyMechanics' />
            </div>
          </div>

          {/* Array helpers */}
          <FieldArray name='keyPoints'>
            {({ push, remove }) => (
              <div>
                <label>Key Points</label>
                {values.keyPoints?.length ? (
                  values.keyPoints.map((_, index) => (
                    <div key={`kp-${index}`}>
                      <Field name={`keyPoints.${index}`} placeholder={`Key point #${index + 1}`} />
                      <button type='button' onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No key points yet.</p>
                )}
                <button type='button' onClick={() => push('')}>
                  Add Key Point
                </button>
              </div>
            )}
          </FieldArray>

          <FieldArray name='commonMistakes'>
            {({ push, remove }) => (
              <div>
                <label>Common Mistakes</label>
                {values.commonMistakes?.length ? (
                  values.commonMistakes.map((_, index) => (
                    <div key={`cm-${index}`}>
                      <Field
                        name={`commonMistakes.${index}`}
                        placeholder={`Mistake #${index + 1}`}
                      />
                      <button type='button' onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No common mistakes yet.</p>
                )}
                <button type='button' onClick={() => push('')}>
                  Add Mistake
                </button>
              </div>
            )}
          </FieldArray>

          <FieldArray name='applications'>
            {({ push, remove }) => (
              <div>
                <label>Applications</label>
                {values.applications?.length ? (
                  values.applications.map((_, index) => (
                    <div key={`ap-${index}`}>
                      <Field
                        name={`applications.${index}`}
                        placeholder={`Application #${index + 1}`}
                      />
                      <button type='button' onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No applications yet.</p>
                )}
                <button type='button' onClick={() => push('')}>
                  Add Application
                </button>
              </div>
            )}
          </FieldArray>

          <FieldArray name='targetAreas'>
            {({ push, remove }) => (
              <div>
                <label>Target Areas</label>
                {values.targetAreas?.length ? (
                  values.targetAreas.map((_, index) => (
                    <div key={`ta-${index}`}>
                      <Field
                        name={`targetAreas.${index}`}
                        placeholder={`Target area #${index + 1}`}
                      />
                      <button type='button' onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No target areas yet.</p>
                )}
                <button type='button' onClick={() => push('')}>
                  Add Target Area
                </button>
              </div>
            )}
          </FieldArray>

          <div style={{ marginTop: 16 }}>
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PunchForm;
