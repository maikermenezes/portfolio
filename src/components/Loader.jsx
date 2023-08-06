import { Html, useProgress } from '@react-three/drei'

const Loader = () => {

  const { progress } = useProgress()

  return (

    <Html style={{
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center'
    }}>
      <span className="canvas-load"></span>
      <p style={{
        fontSize: 20,
        color: '#00dddd',
        fontWeight: 800,
        marginTop: 50
      }}>{progress.toFixed(0)}%</p>
      {/* <span style={{
        height: 3,
        width: `${progress}%`,
        backgroundColor: '#f1f1f1',
        display: 'block',
        marginTop: 10,
        borderRadius: 5
      }}></span> */}
    </Html>

  )
}

export default Loader