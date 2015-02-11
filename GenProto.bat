..\GoogleProtobuf\tools\protogen .\protos\Networkmessage.proto --proto_path=.\protos
copy .\Networkmessage.cs ..\JangadaTileServer\JangadaTileServer\Networkmessage.cs
del .\NetworkMessage.cs