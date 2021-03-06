import m from 'mithril'
import Stream from 'mithril/stream'
import {formatTime} from '../../lib/string'
import * as fullscreen from '../../lib/fullscreen'
import Observer from '../Observer'
import * as svgs from '../svgs'

export interface Attrs {
	score: Stream<number>
	time: Stream<number>
	level: Stream<number>
}

const Hud: m.Component<Attrs> = {
	view ({attrs: {score, time, level}}) {
		return m('.hud',
			m('.score-block',
				// Use 'observer' components for frequently-updating values
				m(Observer, {
					value: score,
					render: (s: number) => String(s),
					view: () => m('.score')
				}),
				m(Observer, {
					value: time,
					render: (t: number) => formatTime(t),
					view: () => m('.time')
				}),
				m(Observer, {
					value: level,
					render: (l: number) => String(l),
					view: () => m('.level')
				})
			),
			m('.control-block',
				m('.fullscreen',
					m('button',
						{
							type: 'button',
							onclick() {
								fullscreen.toggle(
									document.querySelector('.app') as HTMLElement
								)
							}
						},
						fullscreen.is() ?
							svgs.fullscreenOff() : svgs.fullscreenOn()
					)
				)
			)
		)
	}
}

export default Hud
