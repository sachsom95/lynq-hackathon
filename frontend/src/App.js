import logo from './logo.svg';
import './App.css';
import {ChakraProvider, Box} from '@chakra-ui/react'
import LandingPage from './pages/LandingPage';
import Mindmap from './components/Mindmap';
import {mindmapData } from './mockdata/mindmapdata';
import dagre from 'dagre'

function App() {
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



  

  const mindMapAutoLayout = getLayoutedElements (mindmapData.nodes, mindmapData.edges)

  

  return (
    <ChakraProvider>
      <LandingPage />
        {/*<Mindmap n={mindMapAutoLayout.nodes} e={mindMapAutoLayout.edges}/> */}
    </ChakraProvider>
  )
}

export default App;
