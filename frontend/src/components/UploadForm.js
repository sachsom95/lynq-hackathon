import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from '@chakra-ui/react'


const UploadForm = ({ marginTop }) => {
 const [selectedFile, setSelectedFile] = useState();
 const [isFilePicked, setIsFilePicked] = useState(false);

 const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting}
 } = useForm()   




 const onSubmit = (data) => {
    console.log(data.file[0])
 }

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.file} mt={marginTop}>
            <FormLabel htmlFor='file'>Upload a pdf to begin</FormLabel>
            <Input id='file' placeholder='Upload a PDF' type='file' py={1} {
                ...register('file', {
                    required: 'A pdf file is required to continue'
                })
            }/>
            <FormErrorMessage>
                {errors.file}
            </FormErrorMessage>
        </FormControl>

        <Button mt={4} isLoading={isSubmitting} type='submit'>  
            Upload
        </Button> 
    </form>
)

}

export default UploadForm
