interface FPSMonitor {
	update(dt: number): number
	fps(): string
}

/**
 * Create instance of Frames Per Second Monitor
 */
function FPSMonitor (num = 16): FPSMonitor {
	const ticks = new Array<number>(num)
	let sum = 0
	let index = 0
	let f = 60.0  // frames per sec initial assumption
	for (let i = 0; i < num; ++i) {
		ticks[i] = 16.66666667
		sum += 16.66666667
	}

	/**
	 *  Update with new sample
	 *  @return New average frames/second
	 */
	function update (dt: number) {
		sum -= ticks[index]
		sum += dt
		ticks[index] = dt
		index = (index + 1) % num
		f = 1000 * num / sum
		return f
	}

	/** @return current fps string formatted to 1 decimal place */
	function fps() {
		return Math.abs(f).toFixed(1)
	}

	return {update, fps}
}

export default FPSMonitor
