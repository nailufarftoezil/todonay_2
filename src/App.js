import React, {useState} from 'react';
import './App.css';
import { Form, Input, Button, Checkbox, Layout, Menu, Space, Col, Row} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import faker from 'faker';



function App() {

  const [selectedItem, setSelectedItem] = useState(1);

  const { Header, Content, Footer } = Layout;
  //add need this
  const [todos, setTodos] = useState([])
  const [name, setName] = useState("");

  const [total, setTotal] = useState(0)
  
  //edit need this
  const [currentTodo, setcurrentTodo] = useState()
  const [editTodo, setEditTodo] = useState(false)
  
  

  const onChangeTodo = (e) => {
    // ambil nama todo
    console.log(e.currentTarget.value)
    setName(e.currentTarget.value)
  };

  const addTodo = todo => {
    //add new todo to todos
    
    const add = (prev) => {
      return [...prev,{
        id:faker.datatype.uuid(),
        todo: name,
        status: false
      }]
    }
    setTodos(add)
    // after add input clear
    setName("")
  };
  const changeStatus = (id) => {
    const change = todos.map(todo => {
      return {
        ...todo,
        status: todo.id === id ? !todo.status : todo.status
      }
    })
    setTodos(change)
  };
  const remove = id => {
    //  todos.splice(todos.indexOf)
     setTodos(todos => todos.filter(todo => todo.id !== id))
  };

  

 //UPDATE TERBARU BISA NAMBAHIN JUMLAH TODO YANG ACTIVE

  React.useEffect(
    () => {
    const allTotal = todos.map((todo) => todo.status === false).reduce((t, todo)=> t + todo, 0)
    setTotal(allTotal)

    // setTodos(currentTodo)
  }, [todos],
     
  );

  //Sider content 
  const contentSider =  {
    1:  <> 
          <p>
            Add NEW TodoList
          </p>
          <br />
          <Form className="form" >
            {/* terakhir gani current todo how????????? */}
            <Form.Item label="add todo">
                <Input type="text"  onChange={onChangeTodo} value={name}/>
                <br />
                <br />
                <Button type="primary" onClick={addTodo} >Add Todo</Button>
                {/* <Button type="danger" >Clear All</Button> */}
            </Form.Item>
          </Form>

          <p>All Todo List</p><br />
          { editTodo ? (
            todos.map(
              (todo, id) => 
              <>
              <Form className="form" >
                <Form.Item label="Edit todo" key={todo.id}>
                    <Input type="text"  onChange={onChangeTodo} value={todo.todo}/>
                    <Button type="primary" >Edit Todo</Button>
                    <Button type="danger" >Clear All</Button>
                </Form.Item>
              </Form>
            </>
            )) : (
            <>
              {todos.map((todo, i) => (
                <Form.Item key={todo.id}>
                  <Row>
                    <Col span={12}>
                      <Checkbox 
                        checked={todo.status}
                        onChange={()=> changeStatus(todo.id)} >
                        <span >{todo.todo}</span>
                      </Checkbox>
                    </Col>
                    <Col span={12}>
                      <Space size={'large'}>
                        <Button onClick={()=>remove(todo.id)}><DeleteOutlined /></Button>
                        <Button ><EditOutlined /></Button>
                      </Space>
                    </Col>
                  </Row>
                </Form.Item>
                ))
              }
              </>
              )  
          }
        </>,
    2:  <>
          <p>All Done</p><br />
          {todos.filter(todo => todo.status === true).map((todo, i) => (
            
            <Form.Item key={todo.id}>
              <Row>
                <Col span={12}>  
                  <Checkbox 
                    checked={todo.status }
                    onChange={()=> changeStatus(todo.id)} >
                    <span >{todo.todo}</span>
                  </Checkbox>
                </Col>
                <Col span={12}>
                  <Space size={'large'}>
                    <Button onClick={()=>remove(todo.id)}><DeleteOutlined /></Button>
                    <Button ><EditOutlined /></Button>
                  </Space>
                </Col>
              </Row>
          </Form.Item>
          ))}
        </>,
    3: <>
        <p>All Active</p><br />
        {todos.filter(todo => todo.status === false).map((todo, i) => (
          <Form.Item key={todo.id}>
            <Row>
              <Col span={12}>
                <Checkbox 
                  checked={todo.status}
                  onChange={()=> changeStatus(todo.id)} >
                  <span >{todo.todo}</span>
                </Checkbox>
              </Col>
              <Col span={12}>
                <Space size={'large'}>
                  <Button onClick={()=>remove(todo.id)}><DeleteOutlined /></Button>
                  <Button ><EditOutlined /></Button>
                </Space>
              </Col>
          </Row>
        </Form.Item>
        ))}
        </>

  }

  const handleMenuClickSider = menu => {
    setSelectedItem(menu.key);
  }

  
  console.log(selectedItem)
  console.log(todos)
  console.log(total)
  console.log(editTodo)
  //  const { SubMenu } = Menu ;
  return (
    <> 
      <Layout >
        <Header style={{ position: 'fixed', zIndex:1, color:'#fff', width: '100%'}} >
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
              <Menu.Item key="1" onClick={handleMenuClickSider}>Add new Todo</Menu.Item>
              <Menu.Item key="2" onClick={handleMenuClickSider}>All Done</Menu.Item>
              <Menu.Item key="3" onClick={handleMenuClickSider}>All Active Todo</Menu.Item>
              
            </Menu>   
           
        </Header>
        <Content className="content">
          <p> {total} active</p>
          <div className="content-white" >{contentSider[selectedItem]}</div>
          
        </Content>
        
        <Footer style={{textAlign:'center'}}>Footer</Footer>
      </Layout>
    </>
    
  );
}

export default App;
