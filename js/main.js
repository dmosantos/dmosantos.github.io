var app = new Vue({
    
    el: '#app',
    
    data: {
        
        contactFormOpened: false,
        contactFormName: null,
        contactFormEmail: null,
        contactFormMessage: null,
        contactFormSending: false,
        contactFormState: 'waiting'

    },

    methods: {

        openContactForm() {

            this.contactFormOpened = true;
            this.contactFormState = 'waiting';

        },

        closeContactForm() {

            this.contactFormOpened = false;

        },

        submitContactForm(e) {
            
            e.preventDefault();

            if(this.contactFormSending)
                return false;

            this.contactFormSending = true;
            this.contactFormState = 'waiting';
            
            let dataToPost = new FormData();

            dataToPost.append('entry.906232031', this.contactFormName);
            dataToPost.append('entry.2081841900', this.contactFormEmail);
            dataToPost.append('entry.523571066', this.contactFormMessage);

            try {

                fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSe2MfP16H_iGs8uerYJcRN0Tv8OjvBndnYgSeBDHpb2zZoD-g/formResponse', {

                    method: 'POST',
                    mode: 'no-cors',
                    header: { 'Content-Type': 'application/json' },
                    body: dataToPost

                })
                .then(() => {

                    this.contactFormSending = false;
                    this.contactFormState = 'success';

                    this.contactFormName = null;
                    this.contactFormEmail = null;
                    this.contactFormMessage = null;

                })
                .catch( this.catchFunction );

            } catch(err) {

                this.catchFunction(err);

            }

            return false;

        },

        catchFunction(err) {

            console.error(err);
                
            this.contactFormSending = false;
            this.contactFormState = 'fail';

        }

    }

});