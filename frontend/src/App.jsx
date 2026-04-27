import { useState, useEffect } from "react";
import kaprekarsRoutine from "./kaprekars";

const App = () => {
	const [inputNumber, setInputNumber] = useState("");
	const [steps, setSteps] = useState([]);
	const [error, setError] = useState("");
	const [showInfo, setShowInfo] = useState(false);

	const handleInputChange = (event) => {
		const digitsOnly = event.target.value.replace(/\D/g, "").slice(0, 4);
		setInputNumber(digitsOnly);
	};

	useEffect(() => {
		const value = Number(inputNumber);

		if (!inputNumber || Number.isNaN(value)) {
			setSteps([]);
			setError("");
			return;
		}

		try {
			setSteps(kaprekarsRoutine(value));
			setError("");
		} catch (err) {
			setSteps([]);
			setError(err.message);
		}
	}, [inputNumber]);

	return (
		<div className="min-h-screen bg-[#181818] px-4 py-10">
			<div className="mx-auto w-full max-w-3xl rounded-2xl p-6 text-center sm:p-8">
				<div>
					<h1 className="sm:text-4xl text-3xl text-center text-white font-bold">
						Kaprekar&apos;s Routine
					</h1>

					<div className="mt-4">
						<button
							type="button"
							onClick={() => setShowInfo((previous) => !previous)}
							className="inline-flex items-center gap-2 rounded-full border border-[#3a3a3a] bg-[#202020] px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-green-500 hover:text-green-300"
						>
							<span>{showInfo ? "Hide Information" : "Show Information"}</span>
							<span aria-hidden="true">{showInfo ? "-" : "+"}</span>
						</button>
					</div>

					{showInfo ? (
						<>
							<p className="mt-4 mx-auto max-w-2xl text-center sm:text-base text-sm text-gray-300 leading-relaxed">
								Kaprekar&apos;s routine starts with a 4-digit number, sorts its
								digits in descending and ascending order, then subtracts the
								smaller from the larger. Repeating this process reaches 6174
								(Kaprekar&apos;s constant) for any valid 4-digit number with at
								least two different digits, usually in 7 steps or fewer.
							</p>

							<div className="mt-4 mx-auto max-w-70 rounded-lg border border-green-900/70 bg-[#202020] px-4 py-3 text-center text-sm text-gray-200">
								<p className="font-semibold text-green-300">
									Example (starting from 8991)
								</p>
								<p className="mt-1 font-mono">9981 - 1899 = 8082</p>
								<p className="font-mono">8820 - 0288 = 8532</p>
								<p className="font-mono">8532 - 2358 = 6174</p>
							</div>
						</>
					) : null}

					<div className="mt-6 flex items-center justify-center gap-3 text-gray-300">
						<span className="h-px w-12 bg-green-700/70" />
						<p className="text-sm uppercase tracking-[0.14em] text-green-300">
							Try It Below
						</p>
						<span className="h-px w-12 bg-green-700/70" />
					</div>

					<div className="mt-5 w-full max-w-sm mx-auto flex items-center justify-center gap-3">
						<input
							type="text"
							inputMode="numeric"
							maxLength={4}
							value={inputNumber}
							onChange={handleInputChange}
							className="w-full bg-white px-4 py-2.5 rounded-lg text-center text-[#181818] shadow-sm outline-none border border-transparent transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
							placeholder="Enter a 4-digit number"
						/>
					</div>
					<p className="mt-2 text-xs text-gray-400">
						4-digit number with at least two different digits.
					</p>
					{error ? (
						<p className="mt-2 text-sm text-red-300 text-center">{error}</p>
					) : null}
				</div>
				<div className="mt-6 w-full max-w-2xl px-4 mx-auto flex items-center justify-center gap-3">
					<div className="w-full">
						<p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-green-300">
							Iterations
						</p>
						{steps.length === 0 ? (
							<p className="rounded-md border border-dashed border-[#3a3a3a] bg-[#202020] px-3 py-4 text-sm text-gray-400">
								Steps will appear here as you type.
							</p>
						) : (
							<ul className="w-full sm:max-w-120 mx-auto space-y-2">
								{steps.map((step) => (
									<li
										key={step.iteration}
										className={`rounded-md border px-3 py-2 text-center font-mono ${
											step.nextNum === "6174"
												? "border-green-500 bg-green-950/40 text-green-300"
												: "border-[#2a2a2a] bg-[#202020] text-white"
										}`}
									>
										<span className="sm:hidden">{step.iteration}: </span>
										<span className="hidden sm:inline">
											Iteration {step.iteration}:{" "}
										</span>
										{step.reversedNum} - {step.sortedNum} = {step.nextNum}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
