export function Contact() {

    function handleSubmit() {
        //call API function (if we had one) --ex: send an email--
    }

    return (
        <div>
            <h1>Contact Us</h1>
            <p>Have questions or feedback? Feel free to reach out to us!</p>
            <p>You can contact us via email at <a href="blogpostcreation@example.com">blogpostcreation@example.com</a></p>
            <p>Alternatively, you can fill out the form below:</p>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name"/>
                <label>Email:</label>
                <input type="email" name="email"/>
                <label>Message:</label>
                <textarea name="message"></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}