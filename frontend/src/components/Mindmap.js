import React, {useCallback} from 'react'
import {Box, Button, Center} from '@chakra-ui/react'
import ReactFlow, {useEdgesState, useNodesState, addEdge} from 'reactflow'
import 'reactflow/dist/style.css';
import { useLocation, useNavigate } from 'react-router-dom';


const Mindmap = () => {
    //will need to get nodes and edges from the response made to the api call
    const navigate = useNavigate()
    const location = useLocation()
    const initialNodes = location.state.nodes;
    const initialEdges = location.state.edges;

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  return (
    <div style={{ height: '100vh', width: '100vw' }}>
        <ReactFlow 
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
        />

        <Box>
            <Center > 
                <Button onClick={()=>{
                    navigate("/")
                }}> Go Back to Homepage </Button>
            </Center>
        </Box>
    </div>
  )
}

export default Mindmap;