import React, {useCallback} from 'react'
import {Box} from '@chakra-ui/react'
import ReactFlow, {useEdgesState, useNodesState, addEdge} from 'reactflow'
import 'reactflow/dist/style.css';

const Mindmap = ( {n, e} ) => {
    const initialNodes = n;
    const initialEdges = e;

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
    </div>
  )
}

export default Mindmap;