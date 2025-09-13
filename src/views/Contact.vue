<template>
    <main>
        <div class="left">
            <h1>Contact Us</h1>
        </div>
        <div class="right">
            <div class="r-content">
                <h1>Contact Our Team</h1>
                <div class="content">
                    <div class="content-left">
                        <form id="contact-form">
                            <h3>Full Name</h3>
                            <input type="text" />
                            <h3>Email Address</h3>
                            <input type="email" />
                            <h3>Message</h3>
                            <textarea placeholder="..."></textarea>
                        </form>
                    </div>
                    <div class="content-right">
                        <h2>Email</h2>
                        <p>inquire@beepsoftware.com</p>
                        <h2>Based in</h2>
                        <p>Louisville</p>
                        <p>Kentucky</p>
                    </div>
                </div>
                <button type="submit" form="contact-form">Submit</button>
            </div>
        </div>
    </main>
</template>

<script>

</script>

<style scoped>
main {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100vh;
}

.left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 100%;
    box-shadow: 2px 0 10px rgba(0,0,0,0.3);
    z-index: 1;
    font-size: 2rem;
    font-weight: bold;
}

.right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 55%;
    height: 100%;
    background-color: #eee;
    color: #333;
    padding: 2rem;
}

textarea {
    resize: none;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
}
</style>