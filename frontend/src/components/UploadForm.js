import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import dagre from 'dagre'

const UploadForm = ({ marginTop }) => {
 const [selectedFile, setSelectedFile] = useState();
 const [isFilePicked, setIsFilePicked] = useState(false);
 const [mindMapData, setMindMapData] = useState({})

 const navigate = useNavigate()

 const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting}
 } = useForm()   

 const dagreGraph = new dagre.graphlib.Graph()
 dagreGraph.setDefaultEdgeLabel(()=>({}))
 const nodeWidth = 172;
 const nodeHeight = 36;

 const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    dagreGraph.setGraph({ rankdir: direction });
  
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
  
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
  
    dagre.layout(dagreGraph);
  
    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);  
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
  
      return node;
    });
  
    return { nodes, edges };
  };


 const onSubmit = (data) => {
    console.log(data.file[0])
    fetch("", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
  
      })
      .then(async res=> {
        if(!res.ok){
          alert("Error processing your PDF")
        }
        const getData = async() => {
          const data = await res.json()
          setMindMapData(data)
        }
        getData();
        getPDFDataAndNavigate();
      })
 }

 const getPDFDataAndNavigate = () => {
        //adding layout to nodes and edges
        const mindMapAutoLayout = getLayoutedElements (mindMapData.nodes, mindMapData.edges)

        //after succesful call navigate to the mindmap
        navigate("/mindmap", {
            state: {
                nodes: mindMapAutoLayout.nodes,
                edges: mindMapAutoLayout.edges
            }
        })
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
