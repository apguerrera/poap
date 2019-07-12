import { ErrorMessage, Field, Form, Formik, FormikActions, FieldProps } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { setGasPrice } from '../api';
import classNames from 'classnames';
import { SubmitButton } from '../components/SubmitButton';

// Nick T.

interface GasForEventPageState {
  initialValues: GasForEventFormValues;
}

interface GasForEventFormValues {
  gasPrice: number;
}

const GasSettingFormValueSchema = yup.object().shape({
  gasPrice: yup
    .number()
    .typeError('Must be a number')
    .required('Field cannot be empty')
    .min(0)
})

export class GasPage extends React.Component {

  state: GasForEventPageState = {
    initialValues: {
      gasPrice: 0
    }
  };

  async componentDidMount() { }

  onSubmit = async (
    values: GasForEventFormValues,
    actions: FormikActions<GasForEventFormValues>
  ) => {
    try {
      actions.setStatus(null);
      if (!values.gasPrice) return;
      await setGasPrice(values.gasPrice);
      actions.setStatus({
        ok: true,
        msg: `All Done`,
      });
    } catch (err) {
      actions.setStatus({
        ok: false,
        msg: `Update Gas Limit Failed: ${err.message}`,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    return (
      <Formik
        initialValues={this.state.initialValues}
        onSubmit={this.onSubmit}
        validationSchema={GasSettingFormValueSchema}
        render={({ dirty, isValid, isSubmitting, status }) => {
          return (
            <Form>
              <div className="bk-form-row">
                <label htmlFor="gasPrice">Gas Price Setting</label>
                <Field
                  name="gasPrice"
                  render={({ field, form }: FieldProps) => (
                    <input
                      type="number"
                      placeholder="Enter Value"
                      className={classNames(!!form.errors[field.name] && 'error')}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage name="gasPrice" component="p" className="bk-error" />
              </div>
              {status && (
                <div className={status.ok ? 'bk-msg-ok' : 'bk-msg-error'}>{status.msg}</div>
              )}
              <SubmitButton
                text="Update"
                isSubmitting={isSubmitting}
                canSubmit={isValid && dirty}
              />
            </Form>
          );
        }}
      />
    )
  }
}