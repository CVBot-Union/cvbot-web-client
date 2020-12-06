import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {NzMessageService} from 'ng-zorro-antd/message';
import {RtgroupService} from '../../services/rtgroup.service';
import {UserService} from '../../services/user.service';
import {GlobalMessageBusService} from '../../services/global-message-bus.service';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {RTGroupMembersEntity, RTGroupResponse} from '../../models/RTGroupResponse';
import {SlimUserResponse} from '../../models/UserResponse';
import localStorageKey from '../../const/localStorageConst';
import {Router} from '@angular/router';


@Component({
  selector: 'app-rtgroup-manage',
  templateUrl: './rtgroup-manage.component.html',
  styleUrls: ['./rtgroup-manage.component.scss']
})
export class RtgroupManageComponent implements OnInit {
  constructor(
    private router: Router,
    private globalMessageBusService: GlobalMessageBusService,
    private messageService: NzMessageService,
    private rtgroupService: RtgroupService,
    private userService: UserService
  ) { }

  alertText = '';
  groupID = '';

  availableJoinType = [{
    label: '组员',
    value: 'member'
  }, {
    label: '组长',
    value: 'leader'
  }];

  iconUploadEndpoint = environment.apiBase + '/rtgroup/icon/';
  authToken = localStorage.getItem('token');

  rtGroupDetail: RTGroupResponse;
  usersLists: SlimUserResponse[] = [];
  isDetailLoading = false;
  isGroupNotFound = false;

  infoEditing = {
    name: false,
    description: false,
    color: false,
    template: false
  };

  isCancelDisabled = false;
  isOkLoading = false;
  isJoinMemberModalVisible = false;
  selectedUser = '';
  selectedJoinType = this.availableJoinType[0].value;
  userDutyDescription = '';
  currentUserID = localStorage.getItem(localStorageKey.CURRENT_USER_ID);

  membersList: RTGroupMembersEntity[] = [];
  leadersList: RTGroupMembersEntity[] = [];
  invalidUserIDs: string[] = [];

  ngOnInit(): void {
    this.globalMessageBusService.rtgroupChange$.subscribe(groupChange => {
      this.groupID = groupChange;
      this.checkIfCurrentUserIsGroupManager(this.currentUserID, this.groupID);
      this.iconUploadEndpoint = environment.apiBase + '/rtgroup/icon/' + this.groupID;
      this.fetchGroupDetail(this.groupID);
    });
    this.fetchGroupDetail(localStorage.getItem(localStorageKey.CURRENT_GROUP));
  }

  onBeforeFileUpload = (file: NzUploadFile, fileList: NzUploadFile[] ): boolean => {
    this.isOkLoading = true;
    this.messageService.loading('上传中');
    return true;
  }

  onFileUpload = (event: NzUploadChangeParam) => {
    if (event.file.status === 'done') {
      this.messageService.success('上传成功');
      this.isOkLoading = false;
      this.fetchGroupDetail(this.groupID);
    } else if (event.file.status === 'error') {
      this.alertText = '上传头像时发生错误: ' + event.file.response;
    }
  }

  onChangeGroupInfo = () => {
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  onAddMembers = () => {
    this.isJoinMemberModalVisible = true;
    this.selectedJoinType = this.availableJoinType[0].value;
    this.fetchAllUsers();
  }

  onAddLeaders = () => {
    this.isJoinMemberModalVisible = true;
    this.selectedJoinType = this.availableJoinType[1].value;
    this.fetchAllUsers();
  }

  onRemoveMembers = (id: string) => {
    const idIdx = this.rtGroupDetail.members.map(e => e.id).indexOf(id);
    if (idIdx < -1) {
      this.alertText = '无法找到组员索引';
      return;
    }
    this.rtGroupDetail.members.splice(idIdx, 1);
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  onRemoveLeaders = (id: string) => {
    const idIdx = this.rtGroupDetail.members.map(e => e.id).indexOf(id);
    if (idIdx < -1) {
      this.alertText = '无法找到组长索引';
      return;
    }
    this.rtGroupDetail.members.splice(idIdx, 1);
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  onDismissModal = () => {
    this.isJoinMemberModalVisible = false;
  }

  OkAddUsers = () => {
    if (this.userDutyDescription === '') {
      this.userDutyDescription = '成员';
    }
    const builtUser: RTGroupMembersEntity = {
      _id: undefined,
      job: this.userDutyDescription,
      username: undefined,
      id: this.selectedUser,
      isManager: this.selectedJoinType === 'leader'
    };
    this.rtGroupDetail.members = this.mergeNewUser(builtUser, this.rtGroupDetail.members);
    this.updateRTGroupInfo(this.rtGroupDetail);
  }

  private mergeNewUser = (newMember: RTGroupMembersEntity, targetMemberList: RTGroupMembersEntity[]): RTGroupMembersEntity[] => {
    const idIdx = targetMemberList.map(e => e.id).indexOf(newMember.id);
    if (idIdx === -1) {
      targetMemberList.push(newMember);
    }else if (idIdx > -1 && (targetMemberList[idIdx].isManager !== newMember.isManager)) {
      targetMemberList.push(newMember);
    }
    return targetMemberList;
  }

  private updateRTGroupInfo = (updatedInfo: RTGroupResponse) => {
    this.isCancelDisabled = true;
    this.isOkLoading = true;
    this.isDetailLoading = true;
    this.rtgroupService.updateRTGroup(updatedInfo)
      .subscribe(res => {
        this.isDetailLoading = false;
        this.isOkLoading = false;
        this.onDismissModal();
        this.selectedUser = '';
        this.userDutyDescription = '';
        this.fetchGroupDetail(this.groupID);
      }, error => {
        this.isDetailLoading = false;
        this.isOkLoading = false;
        this.onDismissModal();
        this.alertText = '修改转推组信息时出错: ' + error.error.response;
      });
  }

  private fetchAllUsers = () => {
    this.usersLists = [];
    this.userService.getAllUsers()
      .subscribe(res => {
        this.usersLists = res.response;
      }, error => {
        this.alertText = '获取用户时出错: ' + error.message;
      });
  }

  private checkIfCurrentUserIsGroupManager = (userID: string, groupID: string) => {
    this.userService.getCurrentUserDetail()
      .subscribe(res => {
        const groupIdx = res.response.rtgroups.map(e => e._id).indexOf(groupID);
        if (!res.response.rtgroups[groupIdx].isManager){
          this.router.navigate(['home']);
        }
      });
  }

  private fetchGroupDetail = (id: string) => {
    this.isDetailLoading = true;
    this.rtgroupService.getRTGroupByID(id)
      .subscribe(res => {
        this.isDetailLoading = false;
        this.rtGroupDetail = res.response;
        this.buildUsersMeta(this.rtGroupDetail.members, 'member');
        this.buildUsersMeta(this.rtGroupDetail.members, 'leader');
      }, error => {
        this.isDetailLoading = false;
        this.isGroupNotFound = true;
        this.alertText = '获取转推组时出错: ' + error.message;
      });
  }

  private buildUsersMeta = (userIDs: RTGroupMembersEntity[], type: 'member' | 'leader') => {
    if (type === 'member') {
      this.membersList = userIDs.filter(e => !e.isManager);
    }else {
      this.leadersList = userIDs.filter(e => e.isManager);
    }
  }

}
