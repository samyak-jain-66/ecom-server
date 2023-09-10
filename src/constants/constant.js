const GET_WELCOME_EMAIL_TEMPLATE = (name) => {
  const subject = "Welcome to eCommerce - Your One-Stop Shop";

  const message = `We're thrilled to welcome you to eCommerce. As a valued customer, we're committed to providing you with a seamless and enjoyable shopping experience.
                    
                   We offer a wide range of high-quality products, all at competitive prices. Our team is always working to bring you the latest and greatest products, so be sure to check back often to see what's new.`;

  const template = {
    subject: subject,

    content: `
        <img src="https://res.cloudinary.com/dpc9y8njo/image/upload/v1684063294/xxhkw3zimi7drqsjcbbg.jpg"/>
        <h4> Welcome ${name},</h4>

        <p style-{{fontSize : "14px"}}>${message}</p>
        <br />
        <p>Team eCommerce</p>
    `,
  };

  return template;
};

const GET_ORDER_EMAIL_TEMPLATE = (orderData) => {
  const subject = "Your eCommerce Order Confirmation";
  const message =
    "Thank you for placing your order with eCommerce. We're excited to let you know that your order has been received and is currently being processed.";

  const paymentDetailsMessage =
    "Please send us an email with a confirmation after making the payment at the bank address listed below. As soon as we receive payment confirmation, we will begin shipping your item. Happy Shopping!";

  const bankDetailsMessage =
    "HDFC Bank - Acc No. 150001234567012, IFSC Code - HDFC1000123";

  const template = {
    subject: subject,
    content: `
             <img src="https://res.cloudinary.com/dpc9y8njo/image/upload/v1684063294/xxhkw3zimi7drqsjcbbg.jpg"/>
             <h4> Dear ${orderData.name},</h4>

             <p style={{fontSize : "14px"}}>${message}</p>

             <p style={{fontSize : "14px"}}>${paymentDetailsMessage} </p>
             <p style={{fontSize : "14px"}}>${bankDetailsMessage} </p>
             <br />
             <p>Team eCommerce</p>
          `,
  };

  return template;
};

module.exports = { GET_WELCOME_EMAIL_TEMPLATE, GET_ORDER_EMAIL_TEMPLATE };

// content: `
//          <img src="https://res.cloudinary.com/dpc9y8njo/image/upload/v1684063294/xxhkw3zimi7drqsjcbbg.jpg"/>
//          <h4> Dear ${orderData.name},</h4>

//          <p style={{fontSize : "14px"}}>${message}</p>

//          <p style={{fontSize : "14px"}}>${paymentDetailsMessage} </p>
//          <p style={{fontSize : "14px"}}>${bankDetailsMessage} </p>
//          <br />
//          <p>Team eCommerce</p>
//       `,
