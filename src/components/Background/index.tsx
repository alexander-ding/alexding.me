import './index.css'

import { FC, useEffect, useState } from 'preact/compat'

import useColorScheme, { ColorScheme } from '../../hooks/useColorScheme'

interface BallProps {
  color: string
  x: number
  y: number
  size: number
  transformX: number
  transformY: number
  animationDuration: number
  animationDelay: number
  blurRadius: number
  isFlipped: boolean
}

const Ball: FC<BallProps> = ({
  color,
  x,
  y,
  size,
  transformX,
  transformY,
  animationDuration,
  animationDelay,
  blurRadius,
  isFlipped,
}) => {
  const [scheme] = useColorScheme()
  const particleSize = 50
  const particle = ((particleSize * 3) / 4 + particleSize / 4) * size
  const duration = 30
  const flip = isFlipped ? -1 : 1
  const blur = (blurRadius + 0.5) * particleSize
  return (
    <span
      className={'backface-hidden fixed -z-1'}
      style={{
        width: `${particle}vmin`,
        height: `${particle}vmin`,
        marginLeft: `${-particle / 2}vmin`,
        marginTop: `${-particle / 2}vmin`,
        borderRadius: `${particle}vmin`,
        animationName: 'move',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        opacity: scheme === ColorScheme.Dark ? 0.4 : 0.7,
        top: `${y * 50 + 25}vh`,
        left: `${x * 50 + 25}vw`,
        animationDuration: `${animationDuration * duration + 20}s`,
        animationDelay: `${
          animationDelay * -1 * (animationDuration * duration + 20)
        }s`,
        transformOrigin: `${transformX * 50 - 25}vw ${transformY * 50 - 25}vh`,
        boxShadow: `${particle * flip * 2}vmin 0 ${blur}vmin ${color}`,
      }}
    />
  )
}

const colors = [
  '#6f96f4',
  '#73e5f5',
  '#50edc6',
  '#a7f96b',
  '#ffff63',
  '#ef3b3f',
  '#f27255',
  '#ee592d',
  '#ffaa49',
  '#fe899b',
  '#CC99C9',
  '#9EC1CF',
  '#9EE09E',
  '#FDFD97',
  '#FEB144',
  '#FF6663',
]

function sampleBall(): BallProps {
  return {
    color: colors[Math.floor(Math.random() * colors.length)],
    x: Math.random(),
    y: Math.random(),
    size: Math.random(),
    transformX: Math.random(),
    transformY: Math.random(),
    animationDuration: Math.random(),
    animationDelay: Math.random(),
    blurRadius: Math.random(),
    isFlipped: Math.random() > 0.5 ? true : false,
  }
}

const Background: FC = () => {
  const nBalls = 15
  const [balls, setBalls] = useState<Array<BallProps>>([])
  useEffect(() => {
    setBalls(Array(nBalls).fill(0).map(sampleBall))
  }, [])
  return (
    <div className='background'>
      {balls.map((ball) => (
        <Ball {...ball} />
      ))}
    </div>
  )
}

export default Background
