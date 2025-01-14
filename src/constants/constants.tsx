import { AlignJustify, AudioWaveform, Brain, ChartNoAxesCombined, EqualApproximately, Eye, Heading, IdCard, PiIcon, ScanText, ThumbsUp } from "lucide-react"
import {v4 as uuid} from 'uuid'


// create option consts
type sectiontypeprops = {
    id: string
    label: string
    type: string
    icon: React.ReactNode
    description: string
}

export const SECTION_TYPES: sectiontypeprops[] = [
    {
        id: uuid(),
        label: "AI Insight",
        description: "Generate AI-powered insights to uncover trends and improve performance",
        type: "insight",
        icon: <Brain size={19} color='#7112FF' />
    },
    {
        id: uuid(),
        label: "Graph",
        type: "graph",
        description: "Visualize your data with dynamic, AI-driven graphs for better analysis",
        icon: <ChartNoAxesCombined color='#12FFD8' size={19}/>
    },
    {
        id: uuid(),
        label: "Saved",
        type: "saved",
        description: "Add already saved components to the section",
        icon: <EqualApproximately color='#483FFF' size={19}/>
    }
]


// AI insight options
type AIInsight = {
    label:string
    icon:React.ReactNode
    type:string
}

export const InsightOption:AIInsight[]=[
    {
        label:'Prompt',
        icon:<ScanText/>,
        type:'prompt'
    },
    {
        label:"Metrics",
        icon:<AudioWaveform/>,
        type:'metric'
    }
]


// Metrics options

export type metricProps={
    label:string
    icon:React.ReactNode
    type:'Input' | 'Field'
    placeholder?:string
}

export const MetricsOptions:metricProps[]=[
    {
        label:'Post Type',
        icon:<AlignJustify size={19}/>,
        type:'Input',
        placeholder:'Enter Type'
    },
    {
        label:'Likes',
        icon:<ThumbsUp size={19}/>,
        type:'Field'
    },
    {
        label:'Views',
        icon:<Eye size={19}/>,
        type:'Field'
    },
    {
        label:'ID',
        icon:<IdCard size={19}/>,
        type:'Input',
        placeholder:'Enter ID'
    },
    {
        label:'Average',
        icon:<PiIcon size={19}/>,
        type:"Field"
    },
    {
        label:'Heading',
        icon:<Heading size={19}/>,
        type:'Field'
    }
]