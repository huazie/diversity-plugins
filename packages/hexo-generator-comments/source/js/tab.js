(function () {
    /**
     * Tab 切换功能实现
     * 模拟 Bootstrap 的 tab 功能，实现标签页切换
     */
    
    // 等待 DOM 完全加载
    document.addEventListener('DOMContentLoaded', function() {
        initTabs();
    });
    
    // 初始化标签页
    function initTabs() {
        // 初始化评论系统
        const storage = config.comments.storage;
        if (!storage) {
            Diversity.data.remove("selected_comment");
        }
        
        // 获取记忆的评论系统
        const comment = Diversity.data.get("selected_comment");
        
        // 如果有记忆的评论系统，则显示对应标签页
        if (comment) {
            const element = document.querySelector(`a[data-comment="${comment}"]`);
            if (element) {
                activateTab(element);
            } else {
                // 如果没有找到记忆的标签页，则显示第一个标签页
                activateFirstTab();
            }
        } else {
            // 默认显示第一个标签页
            activateFirstTab();
        }
        
        // 绑定点击事件
        bindTabEvents();
    }
    
    // 激活第一个标签页
    function activateFirstTab() {
        const firstTab = document.querySelector('.nav-tabs a[data-toggle="tab"]');
        if (firstTab) {
            activateTab(firstTab);
        }
    }
    
    // 绑定标签页点击事件
    function bindTabEvents() {
        const navTab = document.getElementById("comment-nav-tab");
        if (!navTab) return;
        
        const storage = config.comments.storage;
        
        navTab.addEventListener('click', function(event) {
            const target = event.target.closest('a[data-toggle="tab"]');
            if (!target) return;
            
            // 阻止默认跳转行为
            event.preventDefault();
            
            // 激活标签页
            activateTab(target);
            
            // 如果启用了存储功能，则记住用户选择
            if (storage) {
                const comment = target.dataset.comment;
                if (comment) {
                    Diversity.data.set("selected_comment", comment);
                }
            }
        });
    }
    
    // 激活指定的标签页
    function activateTab(tabElement) {
        if (!tabElement) return;
        
        // 获取目标面板的ID（去掉#前缀）
        const targetId = tabElement.getAttribute('href');
        if (!targetId) return;
        
        // 获取所有标签和面板
        const allTabs = document.querySelectorAll('.nav-tabs li');
        const allTabLinks = document.querySelectorAll('.nav-tabs a[data-toggle="tab"]');
        const allPanes = document.querySelectorAll('.tab-content .tab-pane');
        
        // 移除所有标签和面板的激活状态
        allTabs.forEach(tab => tab.classList.remove('active'));
        allTabLinks.forEach(tab => tab.classList.remove('active'));
        allPanes.forEach(pane => pane.classList.remove('active'));
        
        // 激活当前标签
        const parentLi = tabElement.parentElement;
        if (parentLi) {
            parentLi.classList.add('active');
        }
        tabElement.classList.add('active');
        
        // 激活对应的面板
        const targetPane = document.querySelector(targetId);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }
})();