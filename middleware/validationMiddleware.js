import { body, check,validationResult } from 'express-validator';


//middle ware is a function
//each check and body functions is one middleware , it will process the user request and send the error(if there) and req to next middle ware
// all middleware are kept in an array,and the result passed to next middleware automatically
//validation Result create new req object . if it is empty - no error, if it has value error is there.
export let usersValidation = [

    //external middleware =>check and body middleware from express-validator middleware 
    body('firstName').escape().trim().isLength({ min:3 ,max:10}).withMessage('minimum character required is 3'),
    body('lastName').escape().trim().isLength({ max: 20 }).withMessage('minimum character required is 20'),
    check('email').isEmail().normalizeEmail().withMessage('please provide is with valid email'),
    /* check('password').exists().isLength({ min: 5, max: 20 }).withMessage('your password is too short or too long') */
    check('password').exists().isLength({ min: 6 }).withMessage('password is too short').isLength({ max: 10 }).withMessage('password is too long'),

    // custom validator middleware
    (req, res, next) => {
        const result = validationResult(req);
        console.log('result of user-validation :', result);
        if (result.isEmpty()) {
            next();//no error along with request added . it will add the user to db
        }
        else {
            //it will print the entire error fields ({value,err,param,,msg})
            next({ error: result.errors });
            //it will print only error message
            /* const error = result.errors.reduce((acc, CurrentElement) => {
                acc[currentElement.param] = currentElement.msg;
            }) */
           
        }
      }

     

    
]