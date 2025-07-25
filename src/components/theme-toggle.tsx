import React from 'react'
import { Text, HStack, Switch, useColorMode } from 'native-base'
export default function ThemeToggle() {
 const { colorMode, toggleColorMode } = useColorMode()
 return (
 <HStack space={2} alignItems="center">
 <Text>Escuro</Text>
 <Switch
 isChecked={colorMode === 'light'}
 onToggle={toggleColorMode}
 ></Switch>
 <Text>Claro</Text>
 </HStack>
 )
}
Com os componentes finalizados crie dentro da pasta src uma outra pasta chamada
screens, iremos criar o arquivo que será responsável pela nossa página principal.
./src/screens/main-screen.tsx
import React, { useCallback, useState } from 'react'
import { Icon, VStack, useColorModeValue, Fab } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'
const initialData = [
 {
 id: shortid.generate(),
 subject: 'Comprar ingresso para o cinema',
 done: false
 },
 {
 id: shortid.generate(),
 subject: 'Estudar react native amanhã',
 done: false
 }
]
export default function MainScreen() {
 const [data, setData] = useState(initialData)
 const [editingItemId, setEditingItemId] = useState<string | null>(null)
 const handleToggleTaskItem = useCallback(item => {
 setData(prevData => {
 const newData = [...prevData]
 const index = prevData.indexOf(item)
 newData[index] = {
 ...item,
 done: !item.done
 }
 return newData
 })
 }, [])
 const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
 setData(prevData => {
 const newData = [...prevData]
 const index = prevData.indexOf(item)
 newData[index] = {
 ...item,
 subject: newSubject
 }
 return newData
 })
 }, [])
 const handleFinishEditingTaskItem = useCallback(_item => {
 setEditingItemId(null)
 }, [])
 const handlePressTaskItemLabel = useCallback(item => {
 setEditingItemId(item.id)
 }, [])
 const handleRemoveItem = useCallback(item => {
 setData(prevData => {
 const newData = prevData.filter(i => i !== item)
 return newData
 })
 }, [])
 return (
 <AnimatedColorBox
 flex={1}
 bg={useColorModeValue('warmGray.50', 'primary.900')}
 w="full"
 >
 <Masthead
 title="E aí, Usuário!"
 image={require('../assets/masthead.png')}
 >
 <NavBar />
 </Masthead>
 <VStack
 flex={1}
 space={1}
 bg={useColorModeValue('warmGray.50', 'primary.900')}
 mt="-20px"
 borderTopLeftRadius="20px"
 borderTopRightRadius="20px"
 pt="20px"
 >
 <TaskList
 data={data}
 onToggleItem={handleToggleTaskItem}
 onChangeSubject={handleChangeTaskItemSubject}
 onFinishEditing={handleFinishEditingTaskItem}
 onPressLabel={handlePressTaskItemLabel}
 onRemoveItem={handleRemoveItem}
 editingItemId={editingItemId}
 />
 </VStack>
 <Fab
 position="absolute"
 renderInPortal={false}
 size="sm"
 icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
 colorScheme={useColorModeValue('blue', 'darkBlue')}
 bg={useColorModeValue('blue.500', 'blue.400')}
 onPress={() => {
 const id = shortid.generate()
 setData([
 {
 id,
 subject: '',
 done: false
 },
 ...data
 ])
 setEditingItemId(id)
 }}
 />
 </AnimatedColorBox>
 )
}
Agora dentro de src crie uma nova pasta chamada utils onde configuraremos nosso
style.
./src/utils/styled.tsx
import React from 'react'
import { useStyledSystemPropsResolver } from 'native-base'
export const makeStyledComponent = (Comp: any) => {
 return React.forwardRef((props: any, ref: any) => {
 const [style, restProps] = useStyledSystemPropsResolver(props)
 return (
 <Comp {...restProps} style={style} ref={ref}>
 {props.children}
 </Comp>
 )
 })
}