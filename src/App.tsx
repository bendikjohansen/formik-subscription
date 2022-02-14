import { Field, Form, Formik, FormikFormProps, useFormikContext } from "formik";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { findDifferences } from "./utils/findDifferences";
import { usePrevious } from "./utils/usePrevious";

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled(Field)`
  display: block;
  padding: 5px;
  border: 1px solid #aaa;
  border-radius: 2px;
  font-size: 0.8em;
  outline: 0;
`;

const FormGroup = styled.div`
  margin: 10px 0;
`;

interface TotalForm {
  total: string;
  first: string;
  second: string;
}

const InnerForm = (props: FormikFormProps) => {
  const formik = useFormikContext<TotalForm>();
  const previousValues = usePrevious(formik.values);
  const diff = useMemo(() => findDifferences(formik.values, previousValues), [previousValues]);

  console.count('times rendered');
  useEffect(() => {
    const { total } = formik.values;
    if (!diff || !total) {
      return;
    }

    if (diff.first !== undefined) {
      let value = !isNaN(parseFloat(diff.first || '')) ?
      (parseFloat(total) - parseFloat(diff.first)).toString() : '';

      if (formik.values.second !== value) {
        console.count('times second is set');
        formik.setFieldValue('second', value);
      }
    }

    if (diff.second !== undefined) {
      let value = !isNaN(parseFloat(diff.second || '')) ?
      (parseFloat(total) - parseFloat(diff.second)).toString() : '';

      if (formik.values.first !== value) {
        console.count('times first is set');
        formik.setFieldValue('first', value);
      }
    }
  }, [diff]);

  return (
    <Form {...props}>
      <FormGroup>
        <Label htmlFor="total">Total</Label>
        <Input id="total" name="total" type="text" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="first">First</Label>
        <Input id="first" name="first" type="text" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="second">Second</Label>
        <Input id="second" name="second" type="text" />
      </FormGroup>
      <FormGroup>
        <Input type="submit" value="Submit" id="submit" name="submit" />
      </FormGroup>
    </Form>
  );
}

export const App = () => {
  const initialValues: TotalForm = { total: '5', first: '2', second: '3' };

  return (
    <div>
      <h1>Total form</h1>
      <Formik initialValues={initialValues} onSubmit={() => { }}>
        <InnerForm />
      </Formik>
    </div>
  );
}
