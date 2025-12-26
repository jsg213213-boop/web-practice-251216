//1 필요한 요소 선택. 
const input = document.getElementById('taskInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

//2 버튼 클릭 이벤트 리스너 설정. 
btn.addEventListener('click', function () {
    // 2-1 입력한 값 가져오기 
    const todo = input.value;

    // 2-2. 기본 유효성 검사. todo 내용이 비어 있으면, 실행 안함. 
    if (todo === "") {
        alert('할 일을 입력해주세요.')
        return; // function() { , 익명함수 실행을 중단. 
    }

    // 2-3 목록에 태그를 추가하기. 
    // 방법1, 
    // list.innerHTML += `
    // <li> 
    //   ${todo} 
    //   <button onclick="this.parentElement.remove()">삭제</button>
    // </li>
    // `

    // 방법2 
    // 요소를 하나씩 만들어서 붙이는 방식. 
    // 방법2-1. li 태그를 만들기. 
    const li = document.createElement('li');
    // 방법2-1-2 li 태그의 내용을 , 입력한 todo 의내용을 넣기. 
    li.textContent = todo;

    // 방법2-2. 삭제 버튼 만들기 
    const btn = document.createElement('button');
    // 방법2-2-2, 버튼에 삭제 내용 넣기. 
    btn.textContent = '삭제';

    // 방법2-3 삭제 기능 연결 (클릭시 실행 )
    btn.addEventListener('click', function(){
        // 방법2-3-2 버튼 클릭시, 부모 li를 삭제 
        this.parentElement.remove();
    })

    // 방법2-4 위의 기능들을 조립하기. 
    // li 태그의 자식으로 버튼을 넣기. 
    // <li>  <button> </button></li> 
    li.appendChild(btn);
    // <ul> <li>  <button> </button></li>  </ul>
    list.appendChild(li);

    // 2-4  입력창을 비우기 작업. 
    input.value = ""
})
// 순서1
// 데이터 저장할 저장소 배열 만들기. 
// let todoData = [];

// 순서2
// 그리기 함수 정의 - 함수명은 보통 소문자 시작. 
function render(dataArray) {

  //항상 기본, 데이터를 모두 삭제하고 시작한다. 
  // 기존 내용을 다 지우고,
  listContainer.innerHTML = "";

  //  새로 요소를 그릴 예정. 새로고침 효과.
  // 기반이 데이터를 중심으로 한다. 그 데이터는 배열에 들어있다. 
  //  배열과, 반복문을 같이 사용하는 함수 소개. forEach(function(){}), 이 기법사용.
  todoData.forEach( function(todo) {
	 listContainer.innerHTML += `
    <li>
	  <span>${todo.text}</span>
	  <div>
		<button class="edit-btn" onclick="updateTodo(${todo.id})">
		  수정
		</button>
		<button class="del-btn" onclick="deleteTodo(${todo.id})">
		  삭제
		</button>
	  </div>
	</li>
  `
  } // forEach닫는 태그 
  )  //render 닫는 태그 
 
} //render 닫는 태그 

// 순서3
// 추가, 삭제하는 로직을 배열 형식으로 작업방법으로 변경. 

// 추가 기능 ( 데이터 추가 -> 그리기)
function addTodo() {
    // 할일 입력창에, 문자열이 없는 경우, 경고창을 띄우기 
    if(input.value === "") {
        alert("내용을 필수로 입력해주세요.");
        return; // addTodo 함수를 중단하기. 
    }

    // 비어있지않다. 즉, 할일 내용이 있다. 
    const newTodo = {
        // id , 각 todo마다 고유값을 날짜 형식으로 지정. 
        id: Date.now(),
        text: input.value
    }

    // 새로운 할일, 배열에 추가 
    todoData.push(newTodo); // 1 데이터 배열 추가(배열에 맨뒤로)

    // 순서8
    //저장소에 저장 기능 추가 
    save();
    render(todoData); // 2 화면을 다시 그리기
    input.value = ""; // 3 입력창 비우기 

}
// 순서4
// 추가 기능 이벤트 연결 
// 추가 버튼 클릭 , 리스너(경비원)에게 감지가 된다면,
// 리스너는 , 실행 할 함수 : addTodo
addBtn.addEventListener('click',addTodo )

// 순서5
// 삭제 기능(배열에서 데이터 제외 -> 그리기)
function deleteTodo(id) {
    if(confirm("정말 삭제하시겠습니까?")){
        // 해당 id가 아닌 것만 남기기(필터링)
        todoData = todoData.filter(item => item.id !==id);

        // 순서9, 삭제후, 변경된 부분 저장하기.
        save();

        // 예시) 인덱스   0       1       2
        // 가정)  id     0        1      2
        // todoData = ["사과","바나나", "딸기"]
        // filter 함수는 해당 로직의 참을 만족하는 요소만 남기고, 나머지는 제외합니다. 
        // filter는 배열 안의 모든 요소를 순회한다. 모든 요소를 검사함. 
        // item : todoData 배열의 요소를 하나씩 꺼내서 담기. 
        // 삭제할 요소의 인덱스 : 1(바나나, id : 1)
        // 반복1
        // item : 사과, => item.id(사과 id : 0) !== (id: 1) 달라서, 참. 사과 남아요.
        // 반복2
        // item : 바나나, => item.id(바나나 id : 1) !== (id: 1) 같아서, 거짓. 바나나는 안 남아요.
        // 반복3
        // item : 딸기, => item.id(딸기 id : 2) !== (id: 1) 달라서, 참. 딸기 남아요.
        // 결론, 
        // todoData.filter(item => item.id !==id); 진행 후, 남아 있는 내용?
        // todoData = ["사과", "딸기"]


        render(todoData); //변경된 데이터로 다시 그리기. 
    }
}

// 저장하기 (데이터(배열) -> 문자열 변환 -> 저장)
// 예시)
// 순서6
function save() {
  localStorage.setItem('myTodos', JSON.stringify(todoData));
}

// 불러오기 
// 저장 된 내용이 있으면, 불러오고, 없으면, 빈 배열로 출력. 
// 예시)
// 순서7
// let todoData = JSON.parse(localStorage.getItem('myTodos')) || [];

// 적용. 
// 순서8
// 할일 추가 했을 때, 추가된 내용을 로컬 저장소에 저장하기. 

// 예시
// function addTodo() {
//     // ... (기존 코드)
//     todoData.push(newTodo);
//     save(); // <--- 추가!
//     render(todoData);
//     // ...
// }


// 순서9
// 삭제 후, 로컬 스토리지에 저장,
// function deleteTodo(id) {
//     // ... (기존 코드)
//     todoData = todoData.filter(item => item.id !== id);
//     save(); // <--- 추가!
//     render(todoData);
// }

// 순서 10 
// 불러오기 기능을 , 순서 조정. 위쪽에서 진행..
//let todoData = JSON.parse(localStorage.getItem('myTodos')) || [];


// 순서11
// 불러온 데이터 그리기, 
// render(todoData)

// 순서13
// 수정 기능 구현. 
// 삭제와 비슷함, 
// 1)배열에서, 수정할 id로 해당 todo를 찾아서, 
// 2)해당 내용을 수정하기. 
// 3)그리고, 저장, 
// 4)다시 그리기  
function updateTodo(id) {
  const item = todoData.find(item => item.id ===id); // 수정할 대상 찾기 
// 삭제 처럼, 예시를들어서 보여주기. 
  // 예시)       인덱스   0       1       2
        // 가정)  id     0        1      2
        // todoData = ["사과","바나나", "딸기"]
        // find: 수정할 id 가, 현재 배열에서 찾아서, 찾은 요소를 가져오는 기능. 
        
        // item : todoData 배열의 요소를 하나씩 꺼내서 담기. 
        // 수정할 요소의 인덱스 : 1(바나나, id : 1)
        // 반복1
        // item : 사과, => item.id(사과 id : 0) === (id: 1) 달라서, 거짓. 사과 대상이 아님
        // 반복2
        // item : 바나나, => item.id(바나나 id : 1) === (id: 1) 같다, 참. 바나나 대상이 맞다.
        // 반복3
        // item : 딸기, => item.id(딸기 id : 2) === (id: 1) 달라서, 거짓. 딸기 대상이 아님
        // 결론, 
        // item , 찾고자하는 대상, 바나나가 선택이 됩니다. 

        //item.text : 기존 내용, 바나나가 불러오고
        // newText : 변경할 내용 : 바나나 수정
        // newText : "     바나나 수정     "
        // newText.trim() : "바나나 수정", 양쪽 공백을 다제거.
  const newText = prompt("내용을 수정하세요: ", item.text);
  
  // 기본 유효성 체크, 
  // newText !== null : 객체 비어 있으면 안됨.
  // newText.trim() : 내용의 양쪽 공백을 모두 제거 후, 빈문자열이 아니여야 한다. 
  // 그러면, 수정할게.!
  if(newText !== null && newText.trim() !== "" ) {
    item.text = newText ; // 내용 변경 
	save(); // 저장 
	render(todoData); //  다시 그리기. 
  }
  
}

// 순서15


// 이벤트 리스너(경비원) 추가 , 무엇을 감지? 키보드를 입력 후 
// 키를 누른 상태를 down, 키를 떼는 순간을 up. 이벤트 감지 
searchBtn.addEventListener('click', function(){
  const keyword = searchBox.value; // 검색어 가져오기 
  console.log("1. 검색어를 가지고 오는지 확인 : ",keyword)
  
  // 검색어가 포함된 것만 필터링, 검색어를 포함한 새로운 요소를 뽑아낸다. 
  const filteredData = todoData.filter(item => item.text.includes(keyword));
  console.log("2. 검색어를 포함한 배열을 가져오는지 확인 : ",filteredData)
  
  // 검색어가 포함된 배열를 출력하기. 
  // 조사, 
  // 최초에 실행되는 코드에서, 웹 브라우저의 로컬 저장소 부분을 불러오는 부분과
  // 검색된 배열을 출력하는 부분을 검사. 
  render(filteredData);
})
// 할 일 추가 시 객체 구조
const newTodo = {
    id: Date.now(),
    text: input.value,
    done: false  // 기본값은 미완료(false) 상태
};
function toggleTodo(id) {
    // 1. 해당 id의 아이템 찾기
    const item = todoData.find(todo => todo.id === id);
    
    // 2. done 상태를 반전시키기 (true -> false, false -> true)
    if (item) {
        item.done = !item.done; 
        save();           // 로컬스토리지 저장
        render(todoData); // 변경된 상태로 다시 그리기
    }
}
function render(dataArray) {
    listContainer.innerHTML = "";

    // 데이터가 없을 때 표시
    if (dataArray.length === 0) {
        listContainer.innerHTML = `
            <div class="text-center text-gray-400 py-10">
                할 일이 없습니다. 작성해보세요! 📝
            </div>`;
        return;
    }

    dataArray.forEach(function(todo) {
        // [순서 19-1] 조건부 스타일 설정 (삼항 연산자)
        // 완료(done: true)면 취소선과 회색 처리, 아니면 일반 텍스트
        const textStyle = todo.done ? "line-through text-gray-400" : "text-gray-700";

        // [순서 19-2] 체크박스 체크 여부 결정
        const checked = todo.done ? "checked" : "";

        listContainer.innerHTML += `
        <li class="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
            <div class="flex items-center gap-3">
                <input type="checkbox" ${checked} 
                    onclick="toggleTodo(${todo.id})"
                    class="w-5 h-5 cursor-pointer accent-blue-500"
                >
                <span class="${textStyle} font-medium">${todo.text}</span>
            </div>

            <div class="flex gap-2">
                <button onclick="updateTodo(${todo.id})"
                    class="text-sm bg-green-100 text-green-600 px-3 py-1.5 rounded-md hover:bg-green-200 transition font-bold">
                    수정
                </button>
                <button onclick="deleteTodo(${todo.id})"
                    class="text-sm bg-red-100 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-200 transition font-bold">
                    삭제
                </button>
            </div>
        </li>
        `;
    });
}