export const isAdmin = (req, res, next) => {
    //if user is admin next()
  if (req.user.role === 'admin') {
    next();
  }
  //to see only his profile // same middleware can be used for all condition
  else {
    if (req.user._id.toString() === req.params.id || req.user.orders.includes(req.params.id)) {
      next();
      
    }
    else {
    
      const error = new Error('unauthorized access');
      error.status = 403;//403 is for forbidden
      next(error);
    }
  }

  
  

    //if the user is not admin
  /* else {
    
    const error = new Error('unauthorized access');
    error.status = 403;//403 is for forbidden
    next(error);
  } */
    
 
}