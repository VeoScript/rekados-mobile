import React from 'react'
import tw from 'twrnc'
import { customStyle, fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { ScrollView, View, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

interface TypedProps {
  modalVisible: any
  setModalVisible: any
  proceduresState: any
  setProceduresState: any
}

const EditProcedures: React.FC<TypedProps> = ({ proceduresState, setProceduresState, modalVisible, setModalVisible }) => {

  const [procedureID, setProcedureID] = React.useState<string>('')
  const [editProcedure, setEditProcedure] = React.useState<string>('')

  const handleEditProcedure = (procedureValue: string) => {
    if (procedureValue !== '') {
      let procedureIndex = proceduresState.findIndex(((procedure : { id: string }) => procedure.id === procedureID))
      proceduresState[procedureIndex].details = procedureValue
      setEditProcedure('')
      setProcedureID('')
    } else {
      Toast('Procedure is required')
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setEditProcedure('')
        setModalVisible(false)
      }}      
    >
      <ScrollView style={tw`w-full h-full bg-white`}>
        <View style={tw`flex flex-col w-full p-5`}>
          <View style={tw`flex flex-row items-center justify-between w-full px-2`}>
            <Text style={[tw`text-xl text-neutral-600`, fonts.fontPoppinsBold]}>Edit Procedures</Text>
            <TouchableOpacity
              onPress={() => {
                setEditProcedure('')
                setModalVisible(false)
              }}
            >
              <MaterialIcon
                name="x"
                size="medium"
                color="#c3c3c3"
              />
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-col w-full my-3`}>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Procedure</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <View style={tw`flex flex-row items-start justify-between w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`}>
                <TextInput
                  style={[tw`flex flex-row w-[17rem]`, fonts.fontPoppins, customStyle.alignTop]}
                  editable={procedureID !== ''}
                  multiline={true}
                  numberOfLines={10}
                  value={editProcedure}
                  placeholder="Write your procedure here..."
                  onChangeText={(value: string) => {
                    setEditProcedure(value)
                  }}
                />
                <TouchableOpacity
                  style={tw`mt-2`}
                  disabled={procedureID === ''}
                  onPress={() => {
                    handleEditProcedure(editProcedure)
                  }}
                >
                  <MaterialIcon
                    name="check"
                    size="medium"
                    color={procedureID === '' ? '#CDCDCD' : '#f2b900'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {proceduresState.length > 0 && (
            <React.Fragment>
              <View style={tw`flex flex-row items-center justify-between w-full px-2`}>
                <Text style={[tw`text-xl text-neutral-600`, fonts.fontPoppinsBold]}>My Procedures</Text>
                <TouchableOpacity
                  style={tw`flex flex-row items-center justify-center px-3 py-0.5 rounded-md bg-neutral-600`}
                  activeOpacity={0.7}
                  onPress={() => {
                    Alert.alert(
                      '',
                      'Are you sure you want to reset all procedures?',
                      [
                        {
                          text: 'Cancel',
                          style: "cancel"
                        },
                        {
                          text: 'Yes',
                          onPress: async () => {
                            setProceduresState([])
                          },
                          style: "default"
                        }
                      ],
                      {
                        cancelable: true
                      }
                    )
                  }}
                >
                  <Text style={[tw`text-sm text-white`, fonts.fontPoppins]}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={tw`flex flex-col w-full my-3`}>
                {proceduresState.map((procedure: { id: string, details: string }, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setEditProcedure(procedure.details)
                      setProcedureID(procedure.id)
                    }}
                    style={tw`flex flex-row items-center justify-between w-full p-3 my-0.5 text-sm rounded-xl border border-neutral-200 bg-white`}
                  >
                    <Text style={[tw`text-neutral-600 pr-5`, fonts.fontPoppins]}>{ procedure.details }</Text>
                    <TouchableOpacity
                      onPress={() => {
                        proceduresState.splice(i, 1)
                        setProceduresState([...proceduresState])
                      }}
                    >
                      <MaterialIcon
                        name="x"
                        size="small"
                        color="#c3c3c3"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </Modal>
  )
}

export default EditProcedures
