(function () {
    /**
     * 评论显示模式切换功能
     * 仅在 both 模式下生效，于 tabs 与 dropdown 两种展示之间切换
     */
    document.addEventListener('DOMContentLoaded', function() {
        initModeToggle();
    });
    
    function initModeToggle() {
        const toggleContainer = document.querySelector('.comments-mode-toggle');
        if (!toggleContainer) return;
        
        const tabsBtn = toggleContainer.querySelector('[data-mode="tabs"]');
        const dropdownBtn = toggleContainer.querySelector('[data-mode="dropdown"]');
        if (!tabsBtn || !dropdownBtn) return;
        
        const storage = conf.comments.storage;
        
        // 获取记忆的显示模式，默认为 tabs
        let currentMode = 'tabs';
        if (storage) {
            const savedMode = Diversity.data.get("comment_display_mode");
            if (savedMode === 'tabs' || savedMode === 'dropdown') {
                currentMode = savedMode;
            }
        }
        
        // 应用初始模式
        applyMode(toggleContainer, tabsBtn, dropdownBtn, currentMode);
        
        // 点击 tabs 按钮
        tabsBtn.addEventListener('click', function() {
            if (currentMode === 'tabs') return;
            currentMode = 'tabs';
            applyMode(toggleContainer, tabsBtn, dropdownBtn, currentMode);
            if (storage) {
                Diversity.data.set("comment_display_mode", 'tabs');
            }
        });
        
        // 点击 dropdown 按钮
        dropdownBtn.addEventListener('click', function() {
            if (currentMode === 'dropdown') return;
            currentMode = 'dropdown';
            applyMode(toggleContainer, tabsBtn, dropdownBtn, currentMode);
            if (storage) {
                Diversity.data.set("comment_display_mode", 'dropdown');
            }
        });
    }
    
    function applyMode(toggle, tabsBtn, dropdownBtn, mode) {
        // 直接控制 tabs/dropdown 导航容器显隐（comments 与 comments-all 布局均为 comments-tabbable / comments-dropdown）
        const tabsView = document.querySelector('.comments-tabbable');
        const dropdownView = document.querySelector('.comments-dropdown');

        if (mode === 'tabs') {
            // 滑块指示器位置（作用在切换条自身 class 上，兼容无 wrapper 布局）
            toggle.classList.remove('mode-dropdown');
            toggle.classList.add('mode-tabs');
            if (tabsView) tabsView.style.display = '';
            if (dropdownView) dropdownView.style.display = 'none';
            tabsBtn.classList.add('active');
            dropdownBtn.classList.remove('active');
            tabsBtn.setAttribute('aria-pressed', 'true');
            dropdownBtn.setAttribute('aria-pressed', 'false');
            // 同步 tabs 的选中状态到当前评论系统
            syncTabs();
        } else {
            toggle.classList.remove('mode-tabs');
            toggle.classList.add('mode-dropdown');
            if (tabsView) tabsView.style.display = 'none';
            if (dropdownView) dropdownView.style.display = '';
            dropdownBtn.classList.add('active');
            tabsBtn.classList.remove('active');
            dropdownBtn.setAttribute('aria-pressed', 'true');
            tabsBtn.setAttribute('aria-pressed', 'false');
            // 同步 dropdown 的选中状态到当前评论系统
            syncDropdown();
        }
    }

    function syncTabs() {
        var selectedComment = Diversity.data.get('selected_comment');
        var targetTab = null;

        if (selectedComment) {
            targetTab = document.querySelector('a[data-comments="' + selectedComment + '"]');
        }
        if (!targetTab) {
            targetTab = document.querySelector('.comments-nav-tabs a[data-toggle="tab"]');
        }
        if (!targetTab) return;

        // 切换 tab active 状态
        var allTabs = document.querySelectorAll('.comments-nav-tabs li');
        var allTabLinks = document.querySelectorAll('.comments-nav-tabs a[data-toggle="tab"]');
        for (var i = 0; i < allTabs.length; i++) {
            allTabs[i].classList.remove('active');
        }
        for (var j = 0; j < allTabLinks.length; j++) {
            allTabLinks[j].classList.remove('active');
        }

        var parentLi = targetTab.parentElement;
        if (parentLi) {
            parentLi.classList.add('active');
        }
        targetTab.classList.add('active');

        // 同步评论面板显示
        var targetId = targetTab.getAttribute('href');
        if (targetId) {
            var allPanes = document.querySelectorAll('.comments-tab-content .comments-tab-pane');
            for (var k = 0; k < allPanes.length; k++) {
                allPanes[k].classList.remove('active');
            }
            var targetPane = document.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        }
    }

    function syncDropdown() {
        var dropdown = document.getElementById('comment-nav-dropdown');
        if (!dropdown) return;

        var trigger = dropdown.querySelector('.comments-dropdown-trigger');
        var labelText = dropdown.querySelector('.comments-dropdown-text');
        var items = dropdown.querySelectorAll('.comments-dropdown-item');
        if (!trigger || !labelText || items.length === 0) return;

        // 获取当前存储的选中评论
        var selectedComment = Diversity.data.get('selected_comment');
        var activeItem = null;

        if (selectedComment) {
            activeItem = dropdown.querySelector('.comments-dropdown-item[data-value="' + selectedComment + '"]');
        }
        if (!activeItem) {
            activeItem = dropdown.querySelector('.comments-dropdown-item.active');
        }
        if (!activeItem) {
            activeItem = items[0];
        }
        if (!activeItem) return;

        // 更新 trigger 文本
        labelText.textContent = activeItem.dataset.text;

        // 更新菜单项 active 状态
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var checkIcon = item.querySelector('.comments-dropdown-check');
            if (item === activeItem) {
                item.classList.add('active');
                if (!checkIcon) {
                    var check = document.createElement('span');
                    check.className = 'comments-dropdown-check';
                    check.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    item.appendChild(check);
                }
            } else {
                item.classList.remove('active');
                if (checkIcon) {
                    checkIcon.remove();
                }
            }
        }

        // 同步评论面板显示
        var allPanes = document.querySelectorAll('.comments-dropdown-content .comments-dropdown-pane');
        for (var j = 0; j < allPanes.length; j++) {
            allPanes[j].classList.remove('active');
        }
        var targetPane = document.getElementById('comments-' + activeItem.dataset.value);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }
})();
