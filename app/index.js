const yargs = require("yargs"); // es5(common js)
const fs = require("fs"); // yêu cầu file system
const chalk = require("chalk");
const {readAllTask, createTask, updateTask, deleteTask} = require('./model/task');
// node app/index.js test
yargs.command({
    command: "test", // tên của lệnh
    handler :() => // thực hiện lệnh 
    {
        console.log("test");
    },
});

// CRUD
// create - app/index.js create --title="Hoc node js" --description="dau kho lam"
yargs.command({
    command: "create",
    builder:{ // đặt truyền tham số
        title:{ // biến tham số là title 
            type: "string", // kiểu dữ liệu là string
        },
        description:{ // tương tự với tham số là description 
            type: "string", // kiểu dữ liệu là string 
        },
    },
    handler: (args) =>
    {
        const {title, description} = args;
        const newTask = createTask(title, description); // tạo biến để có thể thông báo cho người dùng
        console.log("Công việc vừa mới được tạo", newTask); // thông báo cho người dùng
    },
});

// read-all - node app/index.js read-all 
yargs.command({
    command: "read-all",
    handler:()=>
    {
        const result = readAllTask();
        console.log("taskJSON: ", result); // in ra JSON
        console.log("read-all"); // tên lệnh
    },
});

// read - node app/index.js read-detail --id="123"
yargs.command({
    command:"read-detail",
    builder:{
        id:{
            type:"string",
        },
    },
    handler:(args)=>
    {
        const {id} = args;
        console.log("id:", id);
        console.log("read-detail");
    },
});

// update - node app/index.js update --id="123" --title ="hoc js" --description="kho lam"
yargs.command({
    command:"update",
    builder:
    {
        id:{
            type:"string"
        },
        title:{
            type:"string"
        },
        description:{
            type:"string"
        },
    },
    handler:(args)=>{
        const {id, title, description} = args;
        const task = updateTask(id, title, description);
        if (task)
        {
            console.log("task update: ",task);

        }else{
            console.log(chalk.red("Not found !"));
        }

    },

});

// delete - node app/index.js delete --id="123"
yargs.command({ 
    command: "delete",
    builder:
    {
        id:{
            type:"string",
        },
    },
    handler:(args)=>{
        const {id} = args; // lấy id riêng ra ngoài biến args
        const task = deleteTask(id); // tìm kiếm công việc cần xóa bằng id
        if (task) // nếu tồn tại công việc cần xóa 
        {
            console.log("delete task: ", task) // in ra công việc bị xóa
        }else{ 
            console.log(chalk.red("Not found")); // còn nếu không tồn tại công việc thì in ra not found
        }
    },

});


// lưu lại lệnh vừa tạo
yargs.parse();
