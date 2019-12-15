<template>
  <div style="padding: 10px" v-loading="loadingAll">
    <el-row style="padding: 10px;background: #fff">
      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演名称</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-input v-model="form.sand_name" size="small" placeholder="请输入预演名称" style="width: 100%;"></el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演类型</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.type" size="small" placeholder="请选择预演类型" style="width:100%;">
              <el-option
                v-for="item in planTypes"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演地区</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.region" size="small" placeholder="请选择预演地区" style="width:100%;">
              <el-option
                v-for="item in regionoptions"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">组织单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.organization" size="small" placeholder="请选择组织单位" style="width:100%;">
              <el-option
                v-for="item in organizationUnits"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">参演单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <treeselect style="font-size: 14px" placeholder="请选择参演单位" v-model="form.part" :multiple="true"
                        :options="joinUnits"/>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演时间</div>
          <div style="width: 56%;margin-left: 6%;">
            <el-date-picker
              size="small"
              style="width: 100%"
              v-model="form.time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演进度</div>
          <div style="width: 76%;margin-left: 5%;">
            <el-steps :active="form.step" align-center style="width: 100%">
              <el-step @click.native="changeStep(0)" style="cursor:pointer" title="草拟" description=""></el-step>
              <el-step @click.native="changeStep(1)" style="cursor:pointer" title="审核" description=""></el-step>
              <el-step @click.native="changeStep(2)" style="cursor:pointer" title="演练" description=""></el-step>
              <el-step @click.native="changeStep(3)" style="cursor:pointer" title="评估" description=""></el-step>
              <el-step @click.native="changeStep(4)" style="cursor:pointer" title="完成" description=""></el-step>
            </el-steps>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px">
          <div style="font-size: 14px;padding-top: 20px">预演计划</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="plan.content" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn" @click="planPictureMessageBox">
            <i class="iconfont icon-tupian"><span style="font-size: 14px;padding-left: 2px;">图片</span></i>
          </div>
          <div class="btn" @click="planAudioMessageBox">
            <i class="iconfont icon-audio"><span style="font-size: 14px;padding-left: 2px">音频</span></i>
          </div>
          <div class="btn" @click="planVideoMessageBox">
            <i class="iconfont icon-shipin"><span style="font-size: 14px;padding-left: 2px">视频</span></i>
          </div>
          <div class="btn" @click="planAnnexMessageBox">
            <i class="iconfont icon-fujian"><span style="font-size: 14px;padding-left: 2px">附件</span></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-huodongliebiao"><span style="font-size: 14px;padding-left: 2px" @click="goSand">沙盘</span></i>
          </div>
        </div>

      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px;">
          <div style="font-size: 14px;padding-top: 20px">过程记录</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="process.content" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn" @click="progressPictureMessageBox">
            <i class="iconfont icon-tupian"><span style="font-size: 14px;padding-left: 2px;">图片</span></i></div>
          <div class="btn" @click="progressAudioMessageBox">
            <i class="iconfont icon-audio"><span style="font-size: 14px;padding-left: 2px">音频</span></i>
          </div>
          <div class="btn" @click="progressVideoMessageBox">
            <i class="iconfont icon-shipin"><span style="font-size: 14px;padding-left: 2px">视频</span></i>
          </div>
          <div class="btn" @click="progressAnnexMessageBox">
            <i class="iconfont icon-fujian"><span style="font-size: 14px;padding-left: 2px">附件</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px">
          <div style="font-size: 14px;padding-top: 20px">演讲总结</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="summary.content" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn" @click="finalPictureMessageBox">
            <i class="iconfont icon-tupian"><span style="font-size: 14px;padding-left: 2px;">图片</span></i>
          </div>
          <div class="btn" @click="finalAudioMessageBox">
            <i class="iconfont icon-audio"><span style="font-size: 14px;padding-left: 2px">音频</span></i>
          </div>
          <div class="btn" @click="finalVideoMessageBox">
            <i class="iconfont icon-shipin"><span style="font-size: 14px;padding-left: 2px">视频</span></i>
          </div>
          <div class="btn" @click="finalAnnexMessageBox">
            <i class="iconfont icon-fujian"><span style="font-size: 14px;padding-left: 2px">附件</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px;">
          <div style="font-size: 14px;padding-top: 20px">预演评估</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="assessment.content" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
      </el-col>

      <el-col :span="10" style="margin-top: 15px">
        <div>
          <el-button type="primary" @click="submitForm">立即提交</el-button>
          <el-button @click="goIndex">取消</el-button>
        </div>
      </el-col>
    </el-row>

    <!--预演计划图片弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="图片资料"
      style="text-align: left"
      :visible.sync="dialogPlanPictureVisible"
      width="60%"
      :before-close="handleClose">
      <el-upload
        style="text-align: left;"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanPicture"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadPlanPicture"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemovePicture(file ,fileListPlanPicture)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--过程记录图片弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="图片资料"
      style="text-align: left"
      :visible.sync="dialogProgressPictureVisible"
      width="60%"
      :before-close="handleClose">
      <el-upload
        style="text-align: left;"
        action=none
        list-type="picture-card"
        :file-list="fileListProgressPicture"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadProgressPicture"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemovePicture(file ,fileListProgressPicture)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--演讲总结图片弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="图片资料"
      style="text-align: left"
      :visible.sync="dialogFinalPictureVisible"
      width="60%"
      :before-close="handleClose">
      <el-upload
        style="text-align: left;"
        action=none
        list-type="picture-card"
        :file-list="fileListFinalPicture"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadFinalPicture"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemovePicture(file ,fileListFinalPicture)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>


    <!--预演计划音频弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="音频资料"
      style="text-align: left"
      :visible.sync="dialogPlanAudioVisible"
      width="60%"
      :before-close="handleClose2">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanAudio"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadPlanAudio"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanAudio(file)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAudio(file , fileListPlanAudio)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--过程记录音频弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="音频资料"
      style="text-align: left"
      :visible.sync="dialogProgressAudioVisible"
      width="60%"
      :before-close="handleClose2">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListProgressAudio"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadProgressAudio"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanAudio(file)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAudio(file , fileListProgressAudio)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--演讲总结音频弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="音频资料"
      style="text-align: left"
      :visible.sync="dialogFinalAudioVisible"
      width="60%"
      :before-close="handleClose2">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListFinalAudio"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadFinalAudio"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanAudio(file)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAudio(file , fileListFinalAudio)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>

    <!--预演计划视频弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="视频资料"
      style="text-align: left"
      :visible.sync="dialogPlanVideoVisible"
      width="60%"
      :before-close="handleClose3">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanVideo"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadPlanVideo"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <video
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          ></video>

          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanVideo(file , dialogPlanVideoVisible)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveVideo(file , fileListPlanVideo)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--预演过程视频弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="视频资料"
      style="text-align: left"
      :visible.sync="dialogProgressVideoVisible"
      width="60%"
      :before-close="handleClose3">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListProgressVideo"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadProgressVideo"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <video
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          ></video>

          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanVideo(file , fileListProgressVideo)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveVideo(file , fileListProgressVideo)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--预演总结视频弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="视频资料"
      style="text-align: left"
      :visible.sync="dialogFinalVideoVisible"
      width="60%"
      :before-close="handleClose3">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListFinalVideo"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadFinalVideo"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <video
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          ></video>

          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanVideo(file , fileListFinalVideo)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveVideo(file , fileListFinalVideo)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>


    <!--预演计划附件弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="附件资料"
      style="text-align: left"
      :visible.sync="dialogPlanAnnexVisible"
      width="60%"
      :before-close="handleClose4">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanAnnex"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadPlanAnnex"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
<!--        <span-->
            <!--          class="el-upload-list__item-preview"-->
            <!--          @click="handlePictureCardPreviewPlanAudio(file)"-->
            <!--        >-->
            <!--          <i class="el-icon-caret-right"></i>-->
            <!--        </span>-->
                 <span
                   v-if="!disabled"
                   class="el-upload-list__item-delete"
                   @click="handleDownloadAudio(file)"
                 >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAnnex(file , fileListPlanAnnex)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--预演过程附件弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="附件资料"
      style="text-align: left"
      :visible.sync="dialogProgressAnnexVisible"
      width="60%"
      :before-close="handleClose4">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListProgressAnnex"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadProgressAnnex"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
<!--        <span-->
            <!--          class="el-upload-list__item-preview"-->
            <!--          @click="handlePictureCardPreviewPlanAudio(file)"-->
            <!--        >-->
            <!--          <i class="el-icon-caret-right"></i>-->
            <!--        </span>-->
                 <span
                   v-if="!disabled"
                   class="el-upload-list__item-delete"
                   @click="handleDownloadAudio(file)"
                 >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAnnex(file , fileListProgressAnnex)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>
    <!--预演总结附件弹框-->
    <el-dialog
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      element-loading-text="上传中..."
      title="附件资料"
      style="text-align: left"
      :visible.sync="dialogFinalAnnexVisible"
      width="60%"
      :before-close="handleClose4">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListFinalAnnex"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadFinalAnnex"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
<!--        <span-->
            <!--          class="el-upload-list__item-preview"-->
            <!--          @click="handlePictureCardPreviewPlanAudio(file)"-->
            <!--        >-->
            <!--          <i class="el-icon-caret-right"></i>-->
            <!--        </span>-->
                 <span
                   v-if="!disabled"
                   class="el-upload-list__item-delete"
                   @click="handleDownloadAudio(file)"
                 >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAnnex(file , fileListFinalAnnex)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>


    <!--图片点击放大弹框-->
    <el-dialog :visible.sync="dialogVisiblePictureModel" :title="playTitle" style="text-align: left;margin-top: -10vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <!--    音频点击放大播放-->
    <el-dialog :visible.sync="dialogVisibleAudioModel" :title="playTitle" style="text-align: left">
      <audio ref='audio' controls="controls">
      </audio>
    </el-dialog>

    <!--视频点击放大播放-->
    <el-dialog :visible.sync="dialogVisibleVideoModel" :title="playTitle" style="text-align: left;margin-top: -10vh">
      <video ref='video' controls="controls">
      </video>
    </el-dialog>
  </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import EditorBar from '@/components/wangEnduit'
  import {api} from '@/api/api'
  import {util} from '@/utils/util'
  // import { Loading } from 'element-ui';
  export default {
    data() {
      return {
        loadingAll : false ,
        loading: false,
        playTitle: "",
        dialogImageUrl: '',
        audioUrl: '',
        disabled: false,

        //三个放大弹框
        dialogVisibleAudioModel: false,
        dialogVisibleVideoModel: false,
        dialogVisiblePictureModel: false,
        //预演计划四个list
        fileListPlanPicture: [],
        fileListPlanAudio: [],
        fileListPlanVideo: [],
        fileListPlanAnnex: [],
        //预演计划四个弹框
        dialogPlanAudioVisible: false,//音频
        dialogPlanVideoVisible: false, //视频
        dialogPlanAnnexVisible: false, //附件
        dialogPlanPictureVisible: false, // 图片

        //过程记录四个list
        fileListProgressPicture: [],
        fileListProgressAudio: [],
        fileListProgressVideo: [],
        fileListProgressAnnex: [],
        //过程记录四个弹框
        dialogProgressAudioVisible: false,//音频
        dialogProgressVideoVisible: false, //视频
        dialogProgressAnnexVisible: false, //附件
        dialogProgressPictureVisible: false, // 图片

        //预演总结四个list
        fileListFinalPicture: [],
        fileListFinalAudio: [],
        fileListFinalVideo: [],
        fileListFinalAnnex: [],
        //预演总结四个弹框
        dialogFinalAudioVisible: false,//音频
        dialogFinalVideoVisible: false, //视频
        dialogFinalAnnexVisible: false, //附件
        dialogFinalPictureVisible: false, // 图片

        dialogVisibleAudio: false,
        isClear: false,
        detail: "",
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              // ['blockquote', 'code-block'],
              // [{'header': 1}, {'header': 2}],
              // [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              // [{'direction': 'rtl'}],
              [{'size': ['small', false, 'large', 'huge']}],
              // [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'font': []}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
              ['clean'],
              // ['link', 'image', 'video']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar']
            }
          }
        },
        content: '',
        time: '',
        value: null,
        name: "TableList",
        joinUnits: [],
        organizationUnits: [],
        regionoptions : [] ,
        planTypes: [],
        form: {
          sand_name: "",
          type: "",
          region: "",
          organization: "",
          part: null,
          time: "",
          step: 0
        },
        //三个富文本框
        // process.content: "",
        // summary.content: "",
        // assessment.content: "",
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        activeNames: ['1'],
        activeName: 'first' ,
        plan :{
          content : "" ,
          images : [] ,
          audios : [] ,
          videos :  [] ,
          attachments : [] ,
        },
        process:{
          content : "" ,
          images : [] ,
          audios : [] ,
          videos :  [] ,
          attachments : [] ,
        },
        summary :{
          content : "" ,
          images : [] ,
          audios : [] ,
          videos :  [] ,
          attachments : [] ,
      },
        assessment:{
          content : "" ,
          images : [] ,
          audios : [] ,
          videos :  [] ,
          attachments : [] ,
        },
      }
    },
    components: {
      Treeselect,
      EditorBar
    },
    mounted() {
      this.$store.commit("change", '演练方案');
      this.id = this.$route.params.id
      this.getData(this.id)
      this.getDataAll()
      if(this.$route.params.print == 1){
        setTimeout(function () {
          window.print()
        },1000)
      }
    },
    methods: {
      getArr (arr){
        let temp = []
        if(arr.length > 0){
          for (let item of arr){
            temp.push(item.fileId)
          }
        }
        return temp
      },
      submitForm (){
        //saveDetail
        this.loadingAll = true
        // let that = this.getArr(this.fileListPlanPicture)
        let that = this
        this.plan = {
          content: this.plan.content ,
          images: this.getArr(this.fileListPlanPicture),
          audios: this.getArr(this.fileListPlanAudio),
          videos: this.getArr(this.fileListPlanVideo),
          attachments: this.getArr(this.fileListPlanAnnex),
        }
        this.process = {
          content: this.process.content ,
          images: this.getArr(this.fileListProgressPicture),
          audios: this.getArr(this.fileListProgressAudio),
          videos: this.getArr(this.fileListProgressVideo),
          attachments: this.getArr(this.fileListProgressAnnex),
        }
        this.summary = {
          content: this.summary.content ,
          images: this.getArr(this.fileListFinalPicture),
          audios: this.getArr(this.fileListFinalAudio),
          videos: this.getArr(this.fileListFinalVideo),
          attachments: this.getArr(this.fileListFinalAnnex),
        }
        this.assessment = {
          content: this.assessment.content ,
          images : [] ,
          audios : [] ,
          videos :  [] ,
          attachments : [] ,
        }
        console.log(this.plan)

        console.log(this.form)

        this.form.time = util.timeFun(this.form.time)
        let data = {
          plan : that.plan ,
          process : that.process ,
          summary : that .summary ,
          assessment : that.assessment ,
          status : that.form.step ,
          previewTime : that.form.time ,
          projectName : that.form.sand_name ,
          projectAreas : that.form.region.split(",") ,
          joinnerUnits : that.form.part ,
          projectType : that.form.type ,
          organizerUnits : that.form.organization.split(",") ,
          id: parseInt(that.id)
        }
        this.$post(api.updateProject , data).then(res=>{
          if(res.errno == 0){
            this.loadingAll = false
            this.$router.push({
              name: `SandList`
            })
          }else{
            this.loadingAll = false
            this.$message.error(res.errmsg);
          }
        })
      },
      getDataAll() {
        this.$get(api.preparedData).then(res => {
          console.log(res)
          let joinUnits = []
          this.planTypes = res.data.projectTypes
          // this.joinUnits = res.data.joinUnits
          this.regionoptions = res.data.projectAreas
          this.organizationUnits = res.data.units
          for (let item of res.data.units) {
            let obj = {}
            obj.id = item.code
            obj.label = item.value
            joinUnits.push(obj)
          }
          this.joinUnits = joinUnits
          console.log(this.joinUnits)
        })
      },

      //预演计划附件上传
      beforeUploadPlanAnnex(file) {
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId  = res.data.id
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/kbzrr6wfhylj35ycjeu8.png'
            obj.annexUrl = res.data.url
            this.fileListPlanAnnex.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log('预演计划附件上传')
        console.log(this.fileListPlanAnnex)
      },
      // 过程记录附件上传
      beforeUploadProgressAnnex(file) {
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.fileId  = res.data.id
            obj.name = res.data.name
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/kbzrr6wfhylj35ycjeu8.png'
            obj.annexUrl = res.data.url
            this.fileListProgressAnnex.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log('// 过程记录附件上传')
        console.log(this.fileListProgressAnnex)
      },
      //演讲总结附件上传
      beforeUploadFinalAnnex(file) {
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.fileId  = res.data.id
            obj.name = res.data.name
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/kbzrr6wfhylj35ycjeu8.png'
            obj.annexUrl = res.data.url
            this.fileListFinalAnnex.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log('// 演讲总结附件上传')
        console.log(this.fileListFinalAnnex)
      },

      //预演计划音频上传upload
      beforeUploadPlanAudio(file) {
        var testmsg = /^audio\/(x-m4a|mp3)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传音频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId  = res.data.id
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListPlanAudio.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log('预演计划音频上传upload')
        console.log(this.fileListPlanAudio)
      },
      //过程记录音频上传upload
      beforeUploadProgressAudio(file) {
        var testmsg = /^audio\/(x-m4a|mp3)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传音频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId  = res.data.id
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListProgressAudio.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("过程记录音频上传upload")
        console.log(this.fileListProgressAudio)
      },
      //演讲总结音频上传upload
      beforeUploadFinalAudio(file) {
        var testmsg = /^audio\/(x-m4a|mp3)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传音频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId  = res.data.id
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListFinalAudio.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("演讲总结音频上传upload")
        console.log(this.fileListFinalAudio)
      },

      //预演计划视频上传upload
      beforeUploadPlanVideo(file) {
        var testmsg = /^video\/(x-matroska|mp4|x-ms-wmv)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传视频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId  = res.data.id
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListPlanVideo.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("预演计划视频上传upload")
        console.log(this.fileListPlanVideo)
      },
      //过程记录视频上传upload
      beforeUploadProgressVideo(file) {
        var testmsg = /^video\/(x-matroska|mp4|x-ms-wmv)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传视频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.fileId  = res.data.id
            obj.name = res.data.name
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListProgressVideo.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("过程记录视频上传upload")
        console.log(this.fileListProgressVideo)
      },
      //演讲总结视频上传upload
      beforeUploadFinalVideo(file) {
        var testmsg = /^video\/(x-matroska|mp4|x-ms-wmv)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传视频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.fileId  = res.data.id
            obj.name = res.data.name
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListFinalVideo.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("演讲总结视频上传upload")
        console.log(this.fileListFinalVideo)
      },


      //预演计划图片上传upload
      beforeUploadPlanPicture(file) {
        var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传图片格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          console.log(res)
          if (res.errno == 0) {

            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.url = res.data.url
            obj.fileId  = res.data.id
            this.fileListPlanPicture.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("fileListPlanPicture")
        console.log(this.fileListPlanPicture)
      },
      //过程记录图片上传upload
      beforeUploadProgressPicture(file) {
        var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传图片格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          console.log(res)
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId  = res.data.id
            obj.url = res.data.url
            obj.fileId  = res.data.id
            this.fileListProgressPicture.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("fileListProgressPicture")
        console.log(this.fileListProgressPicture)
      },
      //演讲总结图片上传upload
      beforeUploadFinalPicture(file) {
        var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传图片格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          console.log(res)
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId  = res.data.id
            obj.url = res.data.url
            this.fileListFinalPicture.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("fileListFinalPicture")
        console.log(this.fileListFinalPicture)
      },

      changeStep(id) {
        this.form.step = id
      },

      //获取id信息
      getData(id) {
        this.$get(api.detail + "?id=" + id).then(res => {
          console.log(res)
          if (res.errno == 0) {
            let joinUnits = []
            // this.planTypes = res.data.planTypes
            // this.joinUnits = res.data.joinUnits
            // this.organizationUnits = res.data.organizationUnits
            // for (let item of res.data.joinnerUnits) {
            //   let obj = {}
            //   obj.id = item.id
            //   obj.label = item.unitName
            //   joinUnits.push(obj)
            // }
            // this.joinUnits = joinUnits
            this.form.sand_name = res.data.projectName
            this.form.time = util.timeFun(res.data.creationDate)
            this.form.type = res.data.projectType
            this.form.organization = res.data.organizerUnits[0].unitCode
            let jonerList = []
            for(let item of res.data.joinnerUnits){
              jonerList.push(item.unitCode)
            }
            this.form.part = jonerList

            this.form.region = res.data.projectAreas[0].areaCode
            this.form.step = res.data.status



            this.plan = {
              content: res.data.plan.content,
              // images: res.data.plan.images,
              // audios: res.data.plan.audios,
              // videos: res.data.plan.videos,
              // attachments: res.data.plan.attachments,
            }
            this.fileListPlanPicture = res.data.plan.images ,
              this.fileListPlanAudio = res.data.plan.audios ,
              this.fileListPlanVideo = res.data.plan.videos ,
              this.fileListPlanAnnex = res.data.plan.attachments ,


            this.process = {
              content: res.data.process.content,
              // images: res.data.process.images,
              // audios: res.data.process.audios,
              // videos: res.data.process.videos,
              // attachments: res.data.process.attachments,
            }
            this.fileListProgressPicture =  res.data.process.images,
              this.fileListProgressAudio= res.data.process.audios,
              this.fileListProgressVideo= res.data.process.videos,
              this.fileListProgressAnnex= res.data.process.attachments,


              this.summary = {
                content: res.data.summary.content,
                // images: res.data.summary.images,
                // audios: res.data.summary.audios,
                // videos: res.data.summary.videos,
                // attachments: res.data.summary.attachments,
              }
            this.fileListFinalPicture= res.data.summary.images,
              this.fileListFinalAudio= res.data.summary.audios,
              this.fileListFinalVideo= res.data.summary.videos,
              this.fileListFinalAnnex= res.data.summary.attachments,


              this.assessment = {
                content: res.data.assessment.content,
                images: res.data.assessment.images,
                audios: res.data.assessment.audios,
                videos: res.data.assessment.videos,
                attachments: res.data.assessment.attachments,
              }

              console.log(this.joinUnits)
          }
        })
      },

      onEditorBlur: function () {
        console.log(this.content)
      },

      //三个图片btn
      planPictureMessageBox() {
        this.dialogPlanPictureVisible = true
      },
      progressPictureMessageBox() {
        this.dialogProgressPictureVisible = true
      },
      finalPictureMessageBox() {
        this.dialogFinalPictureVisible = true
      },

      planAudioMessageBox() {
        this.dialogPlanAudioVisible = true
      },
      progressAudioMessageBox() {
        this.dialogProgressAudioVisible = true
      },
      finalAudioMessageBox() {
        this.dialogFinalAudioVisible = true
      },

      planAnnexMessageBox() {
        this.dialogPlanAnnexVisible = true
      },
      progressAnnexMessageBox() {
        this.dialogProgressAnnexVisible = true
      },
      finalAnnexMessageBox() {
        this.dialogFinalAnnexVisible = true
      },

      planVideoMessageBox() {
        this.dialogPlanVideoVisible = true
      },
      progressVideoMessageBox() {
        this.dialogProgressVideoVisible = true
      },
      finalVideoMessageBox() {
        this.dialogFinalVideoVisible = true
      },

      goIndex() {
        this.$router.push({
          name: `SandList`
        })
      },
      // 图片放大弹框

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(file)
        this.playTitle = file.name
        this.dialogVisiblePictureModel = true;
      },
      // 音频放大弹框
      handlePictureCardPreviewPlanAudio(file) {
        console.log(file)
        console.log(file.url)
        this.dialogVisibleAudioModel = true
        this.$nextTick(() => {
          this.playTitle = file.name
          this.$refs.audio.src = file.url
        })
      },
      // 视频放大弹框
      handlePictureCardPreviewPlanVideo(file) {
        this.dialogVisibleVideoModel = true
        this.$nextTick(() => {
          this.playTitle = file.name
          this.$refs.video.src = file.url
        })
      },
      change() {

      },

      handleClose() {
        this.dialogPlanPictureVisible = false
        this.dialogProgressPictureVisible = false
        this.dialogFinalPictureVisible = false
      },
      handleClose4() {
        this.dialogPlanAnnexVisible = false
        this.dialogProgressAnnexVisible = false
        this.dialogFinalAnnexVisible = false
      },
      handleClose2() {
        this.dialogPlanAudioVisible = false
        this.dialogProgressAudioVisible = false
        this.dialogFinalAudioVisible = false
      },

      handleClose3() {
        this.dialogPlanVideoVisible = false
        this.dialogProgressVideoVisible = false
        this.dialogFinalVideoVisible = false
      },

      handleRemovePicture(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanPicture = fileList
      },

      handleRemoveAudio(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanAudio = fileList
      },

      handleRemoveVideo(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanVideo = fileList
      },

      handleRemoveAnnex(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanAnnex = fileList
      },

      handleDownloadAudio(file) {
        console.log(file)
        // var newUrl= "data:text/html;charset=utf-8,"+ encodeURI(file.annexUrl).replace(/#/g,"%23");
        window.open(newUrl, "_blank");
        // window.location.href = file.annexUrl
        // this.fetchExportBill (file.annexUrl)
      },

      goSand(){
        window.location.href = 'http://47.99.113.181:1001/emergency-system/map/iclient-leaflet/examples/leaflet/index.html';
      }

    }
  }
</script>

<style scoped>
  .ql-editor {
    height: 400px;
  }

  .btnlist {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 13%;
    margin-bottom: 10px;
  }

  .btn {
    margin-right: 15px;
    cursor: pointer;
  }
</style>
