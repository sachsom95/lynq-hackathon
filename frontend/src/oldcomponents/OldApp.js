import React from 'react'
import dagre from 'dagre'
import mockdata from './mockdata.json'
import OldMindMap from './OldMindMap'

const OldApp = () => {
    const cleanData = JSON.parse(JSON.stringify(mockdata))
    console.log(cleanData)

    
    const nodesFromJSON = cleanData.response.nodes
    const edgesFromJSON = cleanData.response.edges

    console.log(nodesFromJSON)
    console.log(edgesFromJSON)
    const position = { x: 0, y: 0 };

    /*
    const newNodesFromJSON = nodesFromJSON.forEach((node)=>{
        node[position] = position;
    })
    */

    

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
  
  
  
    
  
    const mindMapAutoLayout = getLayoutedElements (nodesFromJSON, edgesFromJSON)
    
  return (
    <OldMindMap n={mindMapAutoLayout.nodes} e={mindMapAutoLayout.edges}/>
  )
}

export default OldApp