const Complaint = require('../models/complaints');

module.exports.createcomplaint = async (req, res)=>{
    var {name,description,address,municipality,district,imageurl,mail}=req.body;
    console.log(name,description,address,municipality,district,imageurl);
    const complaint = new Complaint({name,description,address,municipality,district,imageurl,mail});
    await complaint.save();
    console.log(complaint);
}

module.exports.showcomplaints = async (req,res)=>{
    var complaints = await Complaint.find({}); 
    res.json(complaints)
}

module.exports.viewcomplaint = async (req,res)=>{
    var complaint = await Complaint.findById(req.params.id)
    res.json(complaint)
}

module.exports.editcomplaint = async (req,res)=>{
    var {name,description,address,municipality,district}=req.body;
    var complaint = await Complaint.findByIdAndUpdate(req.params.id , {name,description,address,municipality,district})
    await complaint.save();
}

module.exports.deletecomplaint = async (req,res)=>{
    const { id } = req.params;
    await Complaint.findByIdAndDelete(id);
}

module.exports.admin = async (req,res)=>{
    const id = req.params.id
    console.log(req.params.id)
    var complaints = await Complaint.find({municipality : id}); 
    res.json(complaints)
}

module.exports.getadr = async (req,res)=>{
    console.log("GETADRESS")
    var complaint = await Complaint.findById(req.params.id)
    var adr = "Erode"
    res.json(adr)
}