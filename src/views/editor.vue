<script setup lang="ts">
import EditorLeft from '../components/editor/EditorLeft.vue';
</script>

<template>
    <div class="editor">
        <header class="editor-header">
            <div class="editor-header-left">
                <span class="editor-header-left-exit">
                    <i class="icon iconfont icon-fanhui"></i>
                </span>
                <h2>codeFlow</h2>
            </div>
            <div class="editor-header-mid">
                <div class="editor-header-mid-title">新项目</div>
            </div>
            <div class="editor-header-right">
                <div class="editor-header-right-shortcut">
                    <i class="icon iconfont icon-jianpan"></i>
                </div>
                <div class="editor-header-right-btn">预览</div>
                <div class="editor-header-right-btn">导出</div>
                <div class="editor-header-right-avatar">
                    <img src="@/assets/user.jpg" alt="user">
                </div>
            </div>
        </header>
        <section class="editor-body">
            <div class="editor-body-left">
                <EditorLeft></EditorLeft>
            </div>
            <div class="editor-body-container">
                <div class="editor-body-container-top"></div>
                <div class="editor-body-container-content">
                    <div class="editor-body-container-content_inner"></div>
                </div>
            </div>
            <div class="editor-body-right"></div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.editor {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    max-height: 100%;

    &-header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px solid #e8e9eb;

        &-left,
        &-right {
            display: flex;
            align-items: center;
        }

        &-left {
            &-exit {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                border-radius: 4px;
                margin-right: 15px;
                cursor: pointer;

                i {
                    width: 14px;
                }

                .icon-fanhui {
                    font-size: 20px;
                }

                &:hover {
                    background-color: #eaecee;
                }

                &:active {
                    background: #d5d6d8;
                }
            }
            h2 {
                cursor: pointer;
                transition: all .3s;
                &:hover {
                    color: #2468f2;
                }
            }
        }

        &-right {
            &-shortcut {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                border-radius: 4px;
                margin: 0 12px;
                cursor: pointer;

                .icon-jianpan {
                    font-size: 20px;
                }

                &:hover {
                    background-color: #eaecee;
                }

                &:active {
                    background: #d5d6d8;
                }
            }

            &-btn {
                text-align: center;
                line-height: 30px;
                width: 60px;
                height: 30px;
                border-radius: 4px;
                border: 1px solid #000;
                margin: 0 12px;
                cursor: pointer;
                user-select: none;

                &:hover {
                    background: #2468f2;
                    color: #fff;
                    border: none;
                }

                &:active {
                    background: #4a86fe;
                }
            }

            &-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 12px;
                cursor: pointer;
            }
        }
    }

    &-body {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        background-color: #efeff1;
        z-index: 10;
        overflow: hidden;

        &-left {
            z-index: 100;
            width: 310px;
            height: 100%;
            background-color: #ffffff;
            box-shadow: 2px 0 20px 0 rgba(0, 0, 0, .1);
        }

        &-container {
            flex: 1;
            display: flex;
            flex-direction: column;

            &-top {
                width: 100%;
                height: 42px;
                background-color: #fff;
            }

            &-content {
                padding: 24px 16px 16px;
                flex: 1;;
                background-color: #efeff1;

                &_inner {
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    box-shadow: 0 10px 10px -10px rgba(0,0,0,.2);
                }
            }
        }

        &-right {
            z-index: 100;
            width: 280px;
            min-width: 280px;
            height: 100%;
            background-color: #ffffff;
            box-shadow: -2px 0 20px 0 rgba(0, 0, 0, .1);
        }
    }
}
</style>
