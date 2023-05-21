import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import Mindmap from './components/Mindmap';
import {Route, Routes} from 'react-router-dom'
import OldApp from './oldcomponents/OldApp';

function App() {
  /*
  useEffect(()=>{
    getMessageFromBackend()
  })

  const [messageFromBackend, setMessageFromBackend] = useState("")
/*
  const [mindMapData, setMindMapData] = useState({})

  const getMindMapData = () => {
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
    })

  } 


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



  

  //const mindMapAutoLayout = getLayoutedElements (mindmapData.nodes, mindmapData.edges)
  const mindMapAutoLayout = getLayoutedElements (mindMapData.nodes, mindMapData.edges)
  //<Mindmap n={mindMapAutoLayout.nodes} e={mindMapAutoLayout.edges}/> 
  */

  /*

    const getMessageFromBackend = () => {
        fetch("http://localhost:5000/", {
          method: "GET",
          headers: {"Content-Type": "application/json"},
    
        })
        .then(async res=> {
          if(!res.ok){
            alert("Error getting messages")
          }
          const getData = async() => {
            const data = await res.json()
            setMessageFromBackend(data)
          }
          getData();
        })
    }
    */

  

    return (
        <div>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}/>   
            <Route path="/mindmap" element={<Mindmap/>} />
            <Route path="/old" element={<OldApp/>} />
          </Routes>
        </div>
    )
}

export default App;
