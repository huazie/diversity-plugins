(function () {
    // 兼容老的Diversity主题
    if (!window.conf && window.config) {
        window.conf = window.config;
    }

    // 兼容老版本评论插件
    if (window.conf && !window.config) {
        window.config = window.conf;
    }

    /**
     * 自定义 Dropdown 实现
     * 替换原生 <select>，提供更美观的下拉菜单
     */
    
    // 等待 DOM 完全加载
    document.addEventListener('DOMContentLoaded', function() {
        initCustomDropdown();
    });
    
    // 初始化自定义下拉菜单
    function initCustomDropdown() {
        const dropdown = document.getElementById('comment-nav-dropdown');
        if (!dropdown) return;

        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        const labelText = dropdown.querySelector('.dropdown-text');
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        if (!trigger || !menu || !labelText) return;

        const storage = conf.comments.storage;
        if (!storage) {
            Diversity.data.remove("selected_comment");
        }
        
        // 获取记忆的评论系统
        const savedComment = Diversity.data.get("selected_comment");
        
        // 设置初始选中项
        let activeItem = null;
        if (savedComment) {
            activeItem = dropdown.querySelector(`.dropdown-item[data-value="${savedComment}"]`);
        }
        
        // 如果没有记忆的选中项，使用默认的 active 项
        if (!activeItem) {
            activeItem = dropdown.querySelector('.dropdown-item.active');
        }
        
        // 如果还没有，选择第一项
        if (!activeItem && items.length > 0) {
            activeItem = items[0];
        }
        
        // 更新按钮显示和面板
        if (activeItem) {
            updateSelection(activeItem, trigger, labelText, menu, items);
        }
        
        // 点击触发器切换菜单显示
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu(trigger, menu);
        });
        
        // 点击菜单项
        items.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                updateSelection(item, trigger, labelText, menu, items);
                
                // 记住用户选择
                if (storage) {
                    const comment = item.dataset.value;
                    if (comment) {
                        Diversity.data.set("selected_comment", comment);
                    }
                }
                
                // 关闭菜单
                closeMenu(trigger, menu);
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                closeMenu(trigger, menu);
            }
        });
        
        // ESC 键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
                closeMenu(trigger, menu);
            }
        });
    }
    
    // 切换菜单显示/隐藏
    function toggleMenu(trigger, menu) {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
            closeMenu(trigger, menu);
        } else {
            openMenu(trigger, menu);
        }
    }
    
    // 打开菜单
    function openMenu(trigger, menu) {
        trigger.setAttribute('aria-expanded', 'true');
        menu.classList.add('show');
    }
    
    // 关闭菜单
    function closeMenu(trigger, menu) {
        trigger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
    }
    
    // 更新选中状态
    function updateSelection(selectedItem, trigger, labelText, menu, items) {
        // 更新按钮文本
        const text = selectedItem.dataset.text;
        labelText.textContent = text;
        
        // 更新菜单项 active 状态
        items.forEach(function(item) {
            const checkIcon = item.querySelector('.dropdown-check');
            if (item === selectedItem) {
                item.classList.add('active');
                // 添加选中图标
                if (!checkIcon) {
                    const check = document.createElement('span');
                    check.className = 'dropdown-check';
                    check.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6.5 11.5L13 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    item.appendChild(check);
                }
            } else {
                item.classList.remove('active');
                // 移除选中图标
                if (checkIcon) {
                    checkIcon.remove();
                }
            }
        });
        
        // 切换显示对应的 pane
        switchPane(selectedItem.dataset.value);
    }
    
    // 切换显示对应的评论面板
    function switchPane(value) {
        if (!value) return;

        const allPanes = document.querySelectorAll('.dropdown-content .dropdown-pane');
        
        // 隐藏所有面板
        allPanes.forEach(pane => pane.classList.remove('active'));
        
        // 显示对应的面板
        const targetPane = document.getElementById(`comments-${value}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }
})();
