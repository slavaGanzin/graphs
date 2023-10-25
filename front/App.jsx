import React from 'react'
import Flow from './Flow'

import useStore from './HistoryStore';

const script =  [
  {
    id: 0,
    kind: 'send',
    data: { text: 'Hello' },
    next: [1]
  },
  {
    id: 1,
    kind: 'question',
    data: { text: 'Are you good', options: ['Yes', 'No'] },
    next: [3]
  },
  {
    id: 3,
    kind: 'switch',
    data: {
      conditions: [
        { property: 'answer', operation: 'eq', value: 'Yes'},
        { property: 'answer', operation: 'eq', value: 'No'}
      ]
    },
    next: ['4', '5']
  },
  {
    id: 4,
    kind: 'send',
    data: { text: 'That is Good' }
  },
  {
    id: 5,
    kind: 'send',
    data: { text: 'Shame on you' }
  }
]

export default App = () => {
  const setState = useStore(x => x.setState)
  const edges = []
  const nodes = []

  let y = 0
  script.map(({id, kind, data, next}) => {
    if (next) next.map(target => edges.push({
      id: `${id}-${target}`,
      source: String(id),
      target: String(target),
      sourceHandle: String(edges.filter(x => x.source==String(id)).length)
    }))

    const link = edges.find(x => x.target == String(id))
    const siblings = edges.filter(x => x.source==link?.source)

    let x = 0
    if (siblings.length > 1) {
      const i  = siblings.indexOf(link)
      if (i == 0) y++
      x = 200 * i
    } else {
      y++
    }
    nodes.push({id: String(id), type: kind, data, position: { x, y: y*150 }})
  })

  setState({edges, nodes})

  return <Flow/>
}
