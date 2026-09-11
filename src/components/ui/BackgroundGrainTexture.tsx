import React from 'react'

const BackgroundGrainTexture = () => {
	return (
		<div>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[url('/images/footer-grain.svg')] bg-size-[128px_128px] opacity-15 mix-blend-soft-light"
			/>
		</div>
	)
}

export default BackgroundGrainTexture
