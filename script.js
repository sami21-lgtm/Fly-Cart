document.getElementById('add-to-cart').addEventListener('click', function() {
  const productImg = document.getElementById('product-img');
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.getElementById('cart-count');

  // ১. আসল ইমেজ এবং কার্ট বাটনের পজিশন ও সাইজ বের করা
  const imgRect = productImg.getBoundingClientRect();
  const cartRect = cartBtn.getBoundingClientRect();

  // ২. ইমেজের একটি হুবহু ক্লোন (Clone) তৈরি করা
  const imgClone = productImg.cloneNode();
  imgClone.classList.add('flying-img');

  // ৩. ক্লোন ইমেজের প্রাথমিক স্টাইল ও পজিশন সেট করা (ঠিক আসল ইমেজের ওপরে)
  imgClone.style.width = `${imgRect.width}px`;
  imgClone.style.height = `${imgRect.height}px`;
  imgClone.style.left = `${imgRect.left + window.scrollX}px`;
  imgClone.style.top = `${imgRect.top + window.scrollY}px`;

  // DOM-এ ক্লোন ইমেজটি যুক্ত করা
  document.body.appendChild(imgClone);

  // ৪. রেন্ডারিং নিশ্চিত করার জন্য সামান্য ডিলে দিয়ে কার্টের দিকে অ্যানিমেট করা
  setTimeout(() => {
    // কার্ট আইকনের ঠিক মাঝ বরাবর টার্গেট পয়েন্ট নির্ধারণ
    const targetLeft = cartRect.left + window.scrollX + (cartRect.width / 2) - 20;
    const targetTop = cartRect.top + window.scrollY + (cartRect.height / 2) - 20;

    imgClone.style.left = `${targetLeft}px`;
    imgClone.style.top = `${targetTop}px`;
    imgClone.style.width = '40px';  // উড়ার সাথে সাথে সাইজ ছোট হবে
    imgClone.style.height = '40px';
    imgClone.style.opacity = '0.4'; // হালকা ট্রান্সপারেন্ট হবে
  }, 50);

  // ৫. অ্যানিমেশন শেষ হওয়ার পর (0.8s বা 800ms) ক্লোনটি রিমুভ করা এবং কাউন্ট বাড়ানো
  setTimeout(() => {
    imgClone.remove();
    
    // কার্ট কাউন্ট আপডেট করা
    let currentCount = parseInt(cartCount.innerText);
    cartCount.innerText = currentCount + 1;

    // কার্ট আইকনে একটি পপ/বাম্প অ্যানিমেশন দেওয়া
    cartBtn.classList.add('bump');
    setTimeout(() => {
      cartBtn.classList.remove('bump');
    }, 300);

  }, 850);
});
