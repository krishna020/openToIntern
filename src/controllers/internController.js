const collegeModel = require('../models/collegeModel');
const internModel=require('../models/internModel')


function validateMobile(mobile){
 var mobilePattern=  /^[6-9]\d{9}$/gi;
 return mobilePattern.test(mobile)
}
 
function validateEmail(usermail){
    var emailPattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(usermail)
}
//=============================Create Intern POST API==================================!
const createIntern =async function(req,res){
    try{
        let intern=req.body;
        if(Object.keys(intern).length!=0){
            if(!intern.name) return res.status(400).send({status:false,mgs:'Name is required'})

           if(!intern.email) return res.status(400).send({status:false,msg:'Email is reuired'})
            if(!validateEmail(intern.email)) return res.status(400).send({status:false,msg:'Plz enter valid emailId (eg:zyx123@gmail.com)'})
           let usedEmail=await internModel.find({email:intern.email})
           if(usedEmail.length!=0) return res.status(400).send({status:false,msg:"Email already used!"})
          
           if(intern.mobile.length!==10) return res.status(400).send({status:false,msg:"Mobile number must be 10 digits only"})
           if(!validateMobile(intern.mobile)) return res.status(400).send({status:false,msg:'Enter valid Mobile number'})
           
           let udesdMoblie=await internModel.findOne({mobile:intern.mobile})
           if(udesdMoblie!==null){return res.status(400).send({status:false,msg:`${intern.mobile} mobile numeer is already used`})}

           if(!intern.collegeName){ return res.status(400).send({status:false ,msg:" College name is required"})}

           let isCollegeId = await collegeModel.findOne({name:intern.collegeName}).select({_id:1})
           if(!isCollegeId){ return res.status(400).send({status:false,msg:"College name dose not exist"})}

           let id=isCollegeId._id.toString()
           intern.collegeId=id
           delete intern.collegeName

            let internCreated=await internModel.create(intern)
             res.status(201).send({status:true,msg:'Intern succsessfully created',data:internCreated })
        }
        else{
        if(Object.keys(intern).length==0) {return res.status(400).send({msg:'Plz Give Intern details'})}

        }
    }

    catch(err){
        res.status(404).send({status:false,msg:err.message})
    }
}

module.exports.createIntern=createIntern