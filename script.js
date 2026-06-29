const financeForm = document.getElementById('finance-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const totalBalanceEl = document.getElementById('total-balance');
const transactionList = document.getElementById('transaction-list');

// State data transaksi
let transactions = [];

// Fungsi untuk menghitung dan memperbarui total saldo
function updateBalance() {
    const total = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'income') {
            return acc + transaction.amount;
        } else {
            return acc - transaction.amount;
        }
    }, 0);

    // Format ke Rupiah
    totalBalanceEl.innerText = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(total);
}

// Fungsi untuk merender list riwayat transaksi
function renderTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.classList.add(transaction.type);

        const formattedAmount = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(transaction.amount);

        const sign = transaction.type === 'income' ? '+' : '-';

        li.innerHTML = `
            <span>${transaction.description}</span>
            <strong>${sign} ${formattedAmount}</strong>
        `;

        transactionList.appendChild(li);
    });
}

// Handler saat form disubmit
financeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newTransaction = {
        id: Date.now(),
        description: descriptionInput.value,
        amount: parseInt(amountInput.value),
        type: typeInput.value
    };

    transactions.push(newTransaction);

    // Update UI
    updateBalance();
    renderTransactions();

    // Reset Form
    financeForm.reset();
});
