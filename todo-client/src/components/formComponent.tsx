import React from "react";
import { useState } from 'react';
import { TextInput, Button, Group, Box, Slider } from '@mantine/core';
import { useForm } from '@mantine/form';

interface Marks {
  value: number,
  label: string,
}
const MARKS: Marks[] = [
  { value: 0, label: '💀' },
  { value: 25, label: '😔' },
  { value: 50, label: '☹️' },
  { value: 75, label: '🙁' },
  { value: 100, label: '😐' },
];
const FormComponent = (props: any) => {
  const [value, setValue] = useState(50);
  const form = useForm({
    initialValues: {
      issue: '',
      description: '',
      difficulty: { value: 50, label: '☹️' },
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => {
        values.difficulty.value = value;
        values.difficulty.label = MARKS.find(a => a.value === value)?.label || 'wat';
        props.handleSubmit(values)
      }
      )}>
        <TextInput
          withAsterisk
          required
          label="Issue"
          placeholder="It's broken"
          {...form.getInputProps('issue')}
        //onChange={props.handleChange}
        />
        <TextInput
          withAsterisk
          required
          label="Description"
          placeholder="There's a funny sound"
          {...form.getInputProps('description')}
        //onChange={props.handleChange}//nah use mantine's version
        />
        Severity
        <Slider
          value={value}
          onChange={setValue}
          labelAlwaysOn
          label={(val) => {
            const something = MARKS.find((mark) => mark.value === val) as Marks
            return something.label
          }
          }
          defaultValue={50}
          step={25}
          marks={MARKS}
          styles={{ markLabel: { display: 'none' } }}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );









  //   return (
  //     <>
  //       <form onSubmit={props.handleSubmit}>
  //         <h2>Add To Do Item</h2>
  //         <label>
  //           <span>To Do Item</span>
  //           <input onChange={props.handleChange} name="text" type="text" placeholder="Item Details" required={true} />
  //         </label>

  //         <label>
  //           <span>Assigned To</span>
  //           <input onChange={props.handleChange} name="assignee" type="text" placeholder="Assignee Name" required={true} />
  //         </label>

  //         <label>
  //           <span>Difficulty</span>
  //           <input onChange={props.handleChange} defaultValue={props.defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
  //         </label>

  //         <label>
  //           <button type="submit">Add Item</button>
  //         </label>
  //       </form>
  //     </>
  //   )
}
export default FormComponent;