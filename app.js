// Elementi na strani
const obrazec = document.getElementById("obrazec");
const vnos = document.getElementById("vnos");
const seznam = document.getElementById("seznam");
const stevec = document.getElementById("stevec");
// Komentar za nalogeaaa.
// Naloge beremo iz localStorage (ostanejo tudi po osvežitvi strani)
let naloge = JSON.parse(localStorage.getItem("naloge") || "[]");

function shrani() {
  localStorage.setItem("naloge", JSON.stringify(naloge));
}

function narisi() {
  seznam.innerHTML = "";
  naloge.forEach((n, i) => {
    const li = document.createElement("li");
    li.textContent = n.besedilo;
    if (n.opravljeno) li.className = "opravljeno";
    // klik na nalogo jo označi kot opravljeno
    li.onclick = () => { n.opravljeno = !n.opravljeno; shrani(); narisi(); };
    const gumb = document.createElement("button");
    gumb.textContent = "✕";
    // klik na križec nalogo izbriše
    gumb.onclick = (e) => { e.stopPropagation(); naloge.splice(i, 1); shrani(); narisi(); };
    li.appendChild(gumb);
    seznam.appendChild(li);
  });
  const opravljene = naloge.filter((n) => n.opravljeno).length;
  stevec.textContent = "Opravljeno: " + opravljene + " / " + naloge.length;
}

obrazec.onsubmit = (e) => {
  e.preventDefault();
  naloge.push({ besedilo: vnos.value, opravljeno: false });
  vnos.value = "";
  shrani();
  narisi();
};

narisi();
