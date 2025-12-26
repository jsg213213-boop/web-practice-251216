// 1. 필요한 요소 선택
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const listContainer = document.getElementById('taskList');
const searchBox = document.getElementById('searchBox');

// [데이터 초기화] 로컬 스토리지 불러오기 (없으면 빈 배열)
let todoData = JSON.parse(localStorage.getItem('myTodos')) || [];

// 초기 화면 그리기
render(todoData);

// 2. 그리기 함수 (데이터 배열을 받아서 화면에 출력)
function render(dataArray) {
    listContainer.innerHTML = "";
    dataArray.forEach(function(todo) {
        listContainer.innerHTML += `
            <li>
                <span>${todo.text}</span>
                <div>
                    <button onclick="updateTodo(${todo.id})">수정</button>
                    <button onclick="deleteTodo(${todo.id})">삭제</button>
                </div>
            </li>
        `;
    });
}

// 3. 저장 기능 (배열을 JSON 문자열로 변환하여 로컬스토리지에 저장)
function save() {
    localStorage.setItem('myTodos', JSON.stringify(todoData));
}

// 4. 추가 기능
function addTodo() {
    if (input.value.trim() === "") {
        alert("내용을 입력해주세요.");
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: input.value
    };

    todoData.push(newTodo); // 배열에 추가
    save();                 // 저장
    render(todoData);       // 그리기
    input.value = "";       // 입력창 비우기
}

addBtn.addEventListener('click', addTodo);

// 5. 삭제 기능 (id를 비교하여 해당 항목 제외)
function deleteTodo(id) {
    if (confirm("정말 삭제하시겠습니까?")) {
        todoData = todoData.filter(item => item.id !== id);
        save();
        render(todoData);
    }
}

// 6. 수정 기능 (id로 해당 아이템을 찾아 텍스트 변경)
function updateTodo(id) {
    const item = todoData.find(item => item.id === id);

    if (item) {
        const newText = prompt("수정할 내용:", item.text);
        if (newText !== null && newText.trim() !== "") {
            item.text = newText.trim();
            save();
            render(todoData);
        }
    }
}

// 7. 검색 기능 (키워드 포함 여부에 따라 실시간 필터링)
searchBox.addEventListener('keyup', function() {
    const keyword = searchBox.value;
    
    // 원본 todoData는 유지하고, 검색된 결과(filteredData)만 render에 전달
    const filteredData = todoData.filter(item => item.text.includes(keyword));
    render(filteredData);
});
