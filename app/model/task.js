const fs = require("fs"); // yêu cầu file system
const { title } = require("process");
const readAllTask =()=>{
    const buffer = fs.readFileSync("task.json"); // mã dạng hex để máy tính đọc
    const taskString = buffer.toString(); // chuyển sang dạng chuỗi để có thể xử lí
    const taskJson = JSON.parse(taskString); // chuyển sang kiểu JSON
    return taskJson;
}

// tạo tương tác
const createTask = (title, description)=>{
    const newTask = {
        id: Math.random().toString(), // để tạo 1 con số không trùng, nhưng quy định là chuỗi
        title,
        description,
    };
    let tasklist = readAllTask(); // thực hiện lấy mảng
    //tasklist.push(newTask); // cách thứ 2 để đẩy vào trong tasklist
    tasklist = [...tasklist, newTask]; // dùng cách này tiện hơn vì không bị tham chiếu
    fs.writeFileSync("task.json", JSON.stringify(tasklist)); // lưu trữ file theo chuẩn xuống local storage
    return newTask;
};

const updateTask = (id, title, description)=>{
    let taskList = readAllTask();
    const index = taskList.findIndex((task) => task.id === id); // tìm vị trị của công việc bên trong task list
    if (index !== -1) // điều kiện để tìm thấy công việc bên trong task list
    {
        // thực hiện update
        const oldTask = taskList[index]; // trỏ đến công việc cũ
        const newTask = { ...oldTask, title, description}; // ghi đè lên các thuộc tính đã trải ra
        taskList[index] = newTask;
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return newTask;
    }else{
        // thông báo cho người dùng biết
        return false;
    }
};

const deleteTask = (id)=>
{
    let taskList = readAllTask(); // lấy ra task cần xóa
    const index = taskList.findIndex((task) => task.id === id); // hàm tìm vị trí của công việc đang tìm
    if (index !== -1)
    {
        const task = taskList[index];
        taskList = taskList.filter((task) => task.id !== id); // xóa đi phần tử có chứa id tương ứng
        fs.writeFileSync("task.json", JSON.stringify(taskList));
        return task;
    }else{
        return false;
    }
};


module.exports={
    readAllTask,
    createTask,
    updateTask,
    deleteTask,
}

