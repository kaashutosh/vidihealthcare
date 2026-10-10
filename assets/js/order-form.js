(function () {
    const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxUuvAnd6HhFMgTUQ8-hneStK14b4saNth3343-VlwqlLmhhStv8t0OkbpxGTh8q9dp/exec';

    function ensureFormMarkup() {
        if (document.getElementById('orderModal')) return;

        const style = document.createElement('style');
        style.textContent = `
            .order-modal {
                position: fixed;
                inset: 0;
                display: none;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.62);
                z-index: 2000;
                padding: 20px;
            }
            .order-modal.active {
                display: flex;
            }
            .order-modal-card {
                width: min(100%, 560px);
                background: #fff;
                color: #1f2937;
                border-radius: 18px;
                box-shadow: 0 20px 54px rgba(0, 0, 0, 0.28);
                overflow: hidden;
            }
            .order-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, #556B2F, #7a8f46);
                color: #fff;
                padding: 18px 22px;
            }
            .order-modal-header h3 {
                margin: 0;
                font-size: 1.2rem;
            }
            .order-close {
                background: transparent;
                border: none;
                color: #fff;
                font-size: 30px;
                line-height: 1;
                cursor: pointer;
            }
            .order-modal-body {
                padding: 22px 20px 20px;
            }
            .order-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 14px;
            }
            .order-field {
                display: flex;
                flex-direction: column;
                gap: 7px;
            }
            .order-field.full {
                grid-column: 1 / -1;
            }
            .order-field label {
                font-size: 0.86rem;
                font-weight: 600;
                color: #374151;
            }
            .order-field input,
            .order-field textarea,
            .order-field select {
                width: 100%;
                border: 1px solid #d1d5db;
                border-radius: 10px;
                padding: 10px 12px;
                font-size: 0.96rem;
                background: #fff;
                color: #111827;
            }
            .order-field textarea {
                min-height: 90px;
                resize: vertical;
            }
            .order-form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 12px;
                margin-top: 18px;
            }
            .order-btn-secondary,
            .order-btn-primary {
                border: none;
                border-radius: 10px;
                cursor: pointer;
                padding: 10px 18px;
                font-weight: 600;
            }
            .order-btn-secondary {
                background: #e5e7eb;
                color: #111827;
            }
            .order-btn-primary {
                background: #556B2F;
                color: #fff;
            }
            .order-status {
                margin-top: 14px;
                display: none;
                padding: 10px 12px;
                border-radius: 10px;
                font-size: 0.9rem;
            }
            .order-status.success {
                display: block;
                background: #ecfdf5;
                color: #065f46;
            }
            .order-status.error {
                display: block;
                background: #fef2f2;
                color: #991b1b;
            }

            @media (max-width: 640px) {
                .order-form-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;

        document.head.appendChild(style);

        const modal = document.createElement('div');
        modal.id = 'orderModal';
        modal.className = 'order-modal';
        modal.innerHTML = `
            <div class="order-modal-card" role="dialog" aria-modal="true" aria-labelledby="order-title">
                <div class="order-modal-header">
                    <h3 id="order-title">Place Your Order</h3>
                    <button type="button" class="order-close" aria-label="Close" onclick="closeOrderForm()">&times;</button>
                </div>
                <div class="order-modal-body">
                    <form id="orderForm">
                        <div class="order-form-grid">
                            <div class="order-field full">
                                <label>Product</label>
                                <input type="text" name="product" id="orderProductName" readonly>
                            </div>

                            <div class="order-field">
                                <label>Full Name</label>
                                <input type="text" name="name" placeholder="Your full name" required>
                            </div>

                            <div class="order-field">
                                <label>Phone</label>
                                <input type="tel" name="phone" placeholder="Your phone number" required>
                            </div>

                            <div class="order-field">
                                <label>Email</label>
                                <input type="email" name="email" placeholder="Your email address">
                            </div>

                            <div class="order-field">
                                <label>Quantity</label>
                                <select name="quantity" required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div class="order-field">
                                <label>City</label>
                                <input type="text" name="city" placeholder="City">
                            </div>

                            <div class="order-field full">
                                <label>Address</label>
                                <textarea name="address" placeholder="Your complete address" required></textarea>
                            </div>

                            <div class="order-field full">
                                <label>Notes / Health concern</label>
                                <textarea name="notes" placeholder="Optional notes for the team"></textarea>
                            </div>
                        </div>

                        <div class="order-form-actions">
                            <button type="button" class="order-btn-secondary" onclick="closeOrderForm()">Cancel</button>
                            <button type="submit" class="order-btn-primary">Submit Order</button>
                        </div>

                        <div id="orderStatus" class="order-status" aria-live="polite"></div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    window.openOrderForm = function (productName) {
        ensureFormMarkup();

        const modal = document.getElementById('orderModal');
        const productInput = document.getElementById('orderProductName');
        const status = document.getElementById('orderStatus');

        if (productInput) {
            productInput.value = productName || 'Product';
        }

        if (status) {
            status.className = 'order-status';
            status.textContent = '';
        }

        if (modal) {
            modal.classList.add('active');
            const firstInput = modal.querySelector('input[name="name"]');
            if (firstInput) setTimeout(() => firstInput.focus(), 50);
        }
    };

    window.closeOrderForm = function () {
        const modal = document.getElementById('orderModal');
        const form = document.getElementById('orderForm');

        if (modal) modal.classList.remove('active');
        if (form) form.reset();
    };

    function normalizeWhatsAppNumber(number) {
        const digits = String(number || '').replace(/\D/g, '');
        if (!digits) return '918779967380';
        return digits.startsWith('91') ? digits : '91' + digits;
    }

    function openOrderSummaryWhatsApp(formData) {
        const summaryLines = [
            'New order received',
            'Product: ' + (formData.product || 'Not specified'),
            'Name: ' + (formData.name || 'Not provided'),
            'Phone: ' + (formData.phone || 'Not provided'),
            'Email: ' + (formData.email || 'Not provided'),
            'Quantity: ' + (formData.quantity || '1'),
            'City: ' + (formData.city || 'Not provided'),
            'Address: ' + (formData.address || 'Not provided'),
            'Notes: ' + (formData.notes || 'None')
        ];

        const whatsappNumber = normalizeWhatsAppNumber('8779967380');
        const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(summaryLines.join('\n'));
        setTimeout(function () {
            window.open(whatsappUrl, '_blank', 'noopener');
        }, 350);
    }

    document.addEventListener('click', function (event) {
        const modal = document.getElementById('orderModal');
        if (!modal) return;

        if (event.target === modal) {
            window.closeOrderForm();
        }
    });

    document.addEventListener('submit', async function (event) {
        if (event.target && event.target.id === 'orderForm') {
            event.preventDefault();

            const form = event.target;
            const status = document.getElementById('orderStatus');
            const formData = Object.fromEntries(new FormData(form).entries());

            if (!GOOGLE_SHEET_WEB_APP_URL || GOOGLE_SHEET_WEB_APP_URL.includes('PASTE_')) {
                status.className = 'order-status error';
                status.textContent = 'Google Sheet is not connected yet. Please add your Apps Script web app URL in order-form.js.';
                return;
            }

            try {
                status.className = 'order-status';
                status.textContent = 'Submitting your order...';

                const payload = new URLSearchParams();
                Object.entries(formData).forEach(([key, value]) => {
                    payload.append(key, String(value || ''));
                });

                const finalizeSuccess = () => {
                    window.closeOrderForm();
                    status.className = 'order-status success';
                    status.textContent = 'Your order details have been submitted successfully.';
                    openOrderSummaryWhatsApp(formData);
                    form.reset();
                    setTimeout(() => {
                        const modal = document.getElementById('orderModal');
                        if (modal) modal.classList.remove('active');
                    }, 200);
                };

                const finalizeError = (message) => {
                    status.className = 'order-status error';
                    status.textContent = message;
                };

                try {
                    const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
                        method: 'POST',
                        body: payload.toString(),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        mode: 'cors',
                        cache: 'no-store'
                    });

                    const responseText = await response.text();
                    let result = null;

                    try {
                        result = JSON.parse(responseText);
                    } catch (_) {
                        // Ignore non-JSON server responses.
                    }

                    if (!response.ok || (result && result.success === false)) {
                        throw new Error((result && result.message) || 'Google Sheet connection failed. Please check the Apps Script deployment and spreadsheet permissions.');
                    }

                    finalizeSuccess();
                } catch (fetchError) {
                    finalizeError(fetchError && fetchError.message
                        ? fetchError.message
                        : 'The Google Sheet could not be reached. Please publish the Apps Script as "Anyone" and verify the spreadsheet connection.');
                }
            } catch (error) {
                status.className = 'order-status error';
                status.textContent = error && error.message
                    ? error.message
                    : 'Something went wrong while submitting the form. Please try again.';
            }
        }
    });
})();
