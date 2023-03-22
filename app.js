const Url = "https://rxxihkqzafitmcayuokl.supabase.co";
const Key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eGloa3F6YWZpdG1jYXl1b2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5NzI2OTcsImV4cCI6MTk5MTU0ODY5N30.iKPHlGh27Ku0t3rhDsDp6t9wJsEcJ0O7hSaSkWEyVYg";
const database = supabase.createClient(Url, Key);

const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key":
            "c368f482e7mshb1aff7565b94e74p195cecjsn1e4501d97f41",
        "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
    },
};

function getLocalstorage(){
    const getLocal = localStorage.getItem("supabase.auth.token")

    if (getLocal===getLocal){
      console.log("you have persission")

    } 
    if (getLocal === null) {
        location.href = '/test.html';
      }
        
    }

getLocalstorage();


async function init() {

    //read from database
	const { data: amount, error } = await database
		.from("crypto")
		.select("*");
        
	const [adax, minswap, sundaeswap, cardano ] = amount;
	console.log(cardano.amount);


    // function add amount of crypto in possession
	function cryptoStuks(idAantal, cryptoAantal) {
		document.querySelector(idAantal).textContent = cryptoAantal;
	}
	cryptoStuks("#car-aantal-stuks", cardano.amount);
	cryptoStuks("#min-aantal-stuks", minswap.amount);
	cryptoStuks("#sun-aantal-stuks", sundaeswap.amount);
	cryptoStuks("#adax-aantal-stuks", adax.amount);

    //
	async function getCrypto(url, idTot, test, idPrijs, img) {
		const response = await fetch(url, options);
		const data = await response.json();
		document.querySelector(idTot).textContent = Math.floor(
			data.market_data.current_price.eur * test
		);

		//get price
		document.querySelector(idPrijs).textContent =
			data.market_data.current_price.eur;

		//get img
		document.querySelector(img).src = data.image.small;
	}

	getCrypto(
		"https://coingecko.p.rapidapi.com/coins/minswap?market_data=true",
		"#min-waarde",
		minswap.amount,
		"#min-prijs",
		"#min-img"
	);

	getCrypto(
		"https://coingecko.p.rapidapi.com/coins/cardano?market_data=true",
		"#car-waarde",
		cardano.amount,
		"#car-prijs",
		"#car-img"
	);
	getCrypto(
		"https://coingecko.p.rapidapi.com/coins/sundaeswap?market_data=true",
		"#sun-waarde",
		sundaeswap.amount,
		"#sun-prijs",
		"#sun-img"
	);
	getCrypto(
		"https://coingecko.p.rapidapi.com/coins/adax?market_data=true",
		"#adax-waarde",
		adax.amount,
		"#adax-prijs",
		"#adax-img"
	);

    //add to database
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
		e.preventDefault();
		const formData = new FormData(form);
		const messageForm = {
			amount: formData.get("crypto-amount"),
			name: formData.get("crypto-name"),
		};
		console.log(messageForm);

		database.from("crypto")
			.insert([messageForm])
			.then(() => {
				alert("verzonden");
			});
	});


}
init();
