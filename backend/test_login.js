async function testLogin() {
  try {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nama@dragon.com',
        password: 'password'
      })
    });
    const data = await res.json();
    console.log('Login Status:', res.status);
    console.log('Login Body:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Login Error:', error.message);
  }
}

testLogin();
