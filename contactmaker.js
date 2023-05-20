let form = document.getElementById('form');
let userInput = document.getElementById('user-input');
let output = document.getElementById('output');
let contactName = document.getElementById('contact-name');
let startFrom = document.getElementById('from-number');
let downloadLink = document.getElementById('download');

function listenInput(e) {
    e.preventDefault();
    if (userInput.value !== '') {
        let contactNameValue = contactName.value;
        let startFromValue = Number(startFrom.value);
        let inputValueArray = userInput.value.split('\n');
        let outputValueArray = generateOutput(inputValueArray, contactNameValue, startFromValue);
        output.value = outputValueArray.toString().replaceAll(',', '\n');
    }
}

function download(text, filename){
    if (text !== '') {
        var blob = new Blob([text], {type: "text/plain"});
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }

}

function generateOutput(arr, name, from) {
    return (
        arr.map((num, i) => {
            return (
                `BEGIN:VCARD\nN:;${name}-${i + from};;;\nTEL;type=CELL;type=VOICE;type=pref:+${num}\nEND:VCARD`
            )
        })
    )
}
// function downloadMaker(value) {
//     const file = new Blob(value, { type: 'text/plain' });
//     downloadLink.href = URL.createObjectURL(file);
//     downloadLink.download = "contact.vcf";
// }

form.addEventListener('submit',listenInput);
downloadLink.addEventListener('click', e => {
    e.preventDefault();
    download(output.value, 'contacts.vcf');
})


  