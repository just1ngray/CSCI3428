/**
 * This file serves as a test datas
 *
 * @author
 */

const emailData = [
  //test data 1
  {
    _id: "AIJKSBDakjsdbnJKBKNL",
    __v: 1,
    date: Date.now(),
    subject: "Test Subject",
    body: "Hello,\nThis is the body of the email.\nThanks",
    from: {
      name: "Justin Gray",
      email: "justin@gray.ca",
      _id: "account_id",
    },
    to: {
      name: "Nicholas",
      email: "nick@morash.com",
      _id: "account_id2",
    },
    cc: [],
    bcc: [],
  },
  //test data 2
  {
    _id: "rILoLKlFRrSHFVFmNGMa",
    __v: 2,
    date: Date.now(),
    subject: "Happy Birthday!",
    body: "Happy Birthday!\nHope you have a great day!\n-Your Buddy Steve",
    from: {
      name: "Steve Smith",
      email: "steve@hotmail.com",
      _id: "account_id",
    },
    to: {
      name: "Nicholas",
      email: "nick@morash.com",
      _id: "account_id2",
    },
    cc: [],
    bcc: [],
  },
  //test data 3
  {
    _id: "irAVwGVpDBtqfOPfapVc",
    __v: 3,
    date: Date.now(),
    subject: "New Homework Assignment",
    body:
      "Hello Students,\nA new assignment is now available on our Online Classroom\nKind Regards\n\t-Dr. White PhD",
    from: {
      name: "Professor White",
      email: "acwhite@smu.ca",
      _id: "account_id",
    },
    to: {
      name: "Nicholas",
      email: "nick@morash.com",
      _id: "account_id2",
    },

    cc: [],
    bcc: [],
  },
  //test data 4
  {
    _id: "vRFwxOIPmEDPpfqysVSL",
    __v: 4,
    date: Date.now(),
    subject: "Your Amazon Order #23409445 has shipped!",
    body:
      "Good Morning,\nThis message is to let you know your order #23409445 has shipped. \nThanks",
    from: {
      name: "Amazon",
      email: "noreply@amazon.ca",
      _id: "account_id",
    },
    to: {
      name: "Nicholas",
      email: "nick@morash.com",
      _id: "account_id2",
    },
    cc: [],
    bcc: [],
  },
  //test data 5
  {
    _id: "NSVzHRcMysJhbzTEUjqg",
    __v: 5,
    date: Date.now(),
    subject: "RE: Plans for Dinner",
    body: "hey friend, im okay with that date and time, see you there",
    from: {
      name: "Mary",
      email: "mbswanson@gmail.com",
      _id: "account_id",
    },
    to: {
      name: "Nicholas",
      email: "nick@morash.com",
      _id: "account_id2",
    },
    cc: [],
    bcc: [],
  },
];

export default emailData;
