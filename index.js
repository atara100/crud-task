const { ObjectId } = require('mongodb');

async function main(){
    const MongoClient=require('mongodb').MongoClient;
    let uri="mongodb://localhost:27017";
    const client=new MongoClient(uri);
    try{
     await client.connect();
     //await insertObjectToProjects(client,"project4",
     //{"$oid": "62866af24f034c5cb499c20f"},"group 2");
     //await insertError(client,4, "6295ca78581d5778a517c2d5","new");
     //await updateTypeProject(client,2,"moshe levi");
     //await deleteError(client,3);
     await findeProject(client,  { _id: { $in: ObjectId("507c35dd8fada716c89d0013")} });
    }
    catch(error){
     console.log("error"+error);
    }
    finally{
client.close();
console.log("the connection close");
    }
}

async function insertObjectToProjects(client,name,type,workers){
const newProject={
    "name":name,
    "type":type,
    "workers":workers
}
   await client.db("pms").collection("projects").insertOne(newProject);
}

async function insertError(client,num,project,status){
let newError={
    "num":num,
    "project":project,
    "status":status
}
   await client.db("pms").collection("errors").insertOne(newError);
}

async function updateTypeProject(client,id,newManager){
   await client.db("pms").collection("projectsType")
.updateOne({"typeid":id},{$set:{"manager":newManager}});
}

async function deleteError(client,errorId){
    await client.db("pms").collection("errors").deleteOne({"errorId":errorId});
}

async function findeProject(client,typeId){
 const res=await client.db("pms").collection("projects").find({"type":typeId});
 console.log(res);
}

main();