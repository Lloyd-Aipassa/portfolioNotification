const Url = "https://rxxihkqzafitmcayuokl.supabase.co";
const Key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eGloa3F6YWZpdG1jYXl1b2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5NzI2OTcsImV4cCI6MTk5MTU0ODY5N30.iKPHlGh27Ku0t3rhDsDp6t9wJsEcJ0O7hSaSkWEyVYg";
const database = supabase.createClient(Url, Key);

function getLocalstorage() {
	const getLocal = localStorage.getItem("supabase.auth.token");

	if (getLocal === getLocal) {
		console.log("you have persission");
	}
	if (getLocal === null) {
		location.href = "/login.html";
	}
}

getLocalstorage();


async function init() {
	//read from database
	const { data: amount, error } = await database
		.from("crypto")
		.select("*");

	let prijs;
	const arr = [];
	// const arrTotals = [];
	const totaal = document.getElementById("totaal");
	amount.forEach((crypto, i) => {
		async function getCrypto() {
			const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${crypto.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
			const data = await response.json();
			prijs = data[0].current_price;

			const cardsElement = document.querySelector("#cards");
			const element = document.createElement("li");
			const element2 = document.createElement("button");
			element.classList.add("card");
			element2.classList.add(
				"card-button",
				"material-symbols-outlined"
			);
			element2.onclick = async function () {
				let text =
					"Weet je zeker dat je wil verwijderen\nkies OK of Cancel.";
				if (confirm(text) == true) {
					try {
						const { data, error } =
							await database
								.from("crypto")
								.delete()
								.eq(
									"name",
									crypto.name
								);
						location.href = "/index.html";
					} catch (error) {
						console.log("error", error);
					}
				}
			};

			element.innerHTML = `
                <img src= ${data[0].image}>
                <p>
                    Huidige prijs ${crypto.name}: € ${prijs}  </p>
                    <div class="lijn"></div>
                <p> Het aantal stuks inbezit ${crypto.amount} <br></p>
                    <div class="lijn"></div>
                <p> De totale waarde is: €<b>${(prijs * crypto.amount).toFixed(2)}</b></p>
            `;
			element2.innerHTML = `delete`;
			cardsElement.append(element);
			element.append(element2);
			// console.log(element.innerHTML)

			//Bereken en set de totale waarde van de wallet
			const totalePrijs = Math.floor(prijs * crypto.amount);
			if(totalePrijs > 0) 
			arr.push(totalePrijs);

			const sum = arr.reduce((partialSum, a) => partialSum + a, 0);
			totaal.textContent = `Lloyd's portfolio €${sum},-`;
		}
		getCrypto();
	});


	//add to database
	const formAdd = document.querySelector("#add-form");
	formAdd.addEventListener("submit", (e) => {
		e.preventDefault();
		const formData = new FormData(formAdd);
		const messageForm = {
			amount: formData.get("crypto-amount"),
			name: formData.get("crypto-name").toLowerCase()
		};
		console.log(messageForm);

		database.from("crypto")
			.insert([messageForm])
			.then(() => {
				// alert("verzonden");
				formAdd.classList.remove("visible");
				formAdd.style.opacity = "0";
				drkBg.classList.remove("drk-bg");
				location.href = "/index.html";
			});
	});

	//update database
	const update = document.getElementById("update-form");
	update.addEventListener("submit", async (e) => {
		e.preventDefault();
		let amount = document.getElementById(
			"update-crypto-amount"
		).value;
		let name = document.getElementById("update-crypto-name").value;
		const res = await database
			.from("crypto")
			.update({
				amount,
				name,
			})
			.eq("name", name);

		if (res) {
			formUpdate.classList.remove("visible");
			formUpdate.style.opacity = "0";
			drkBg.classList.remove("drk-bg");
			location.href = "/index.html";
		} else {
			alert("crypto Update failed");
		}
	});
}



init();
