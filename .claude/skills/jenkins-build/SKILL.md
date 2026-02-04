---
name: jenkins-build
description: 通过 jenkins 进行打包，当用户提及打包时使用。
---
# jenkins-build
使用bash脚本请求jenkins api 进行打包。
## Usage
- 从package.json 读取jenkins的地址（JENKINS_URL）。
- 获取当前分支名（BRANCH_NAME=origin/master）。
- 查看工作区和暂存区是否有未提交代码（git status）若存在提示需要提交并中断。
- 对比本地和远端当前分支是否一致（remote 和 local 的 commit）若存在提示跟新远端代码交并中断。
- 用户选择打包模式，可多选 lds,wv,lx (lds: cefview包；wv: webview包；lx: 联想联运包;),若不进行选择中断。
- 构建并执行指令进行打包
- 触发构建后，获取构建号（BUILD_NUMBER），可通过查询 nextBuildNumber 或从构建响应中获取
- 询问用户是否需要监控构建状态（可选）
- 询问用户是否需要查看构建控制台输出（可选）

## 打包模式说明
- **单模式**：直接传递单个值，例如 `--data mode=lds`
- **多模式**：由于 Jenkins 的 mode 参数是 Check Boxes 类型（分隔符为 `-`），需要多次传递同一个参数名，Jenkins 会自动用分隔符连接。例如选择 lds 和 wv 时，需要传递 `--data "mode=lds" --data "mode=wv"`

## 指令模板

### 单模式打包
```bash
curl -X POST "JENKINS_URL/buildWithParameters" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6" --data branchName=BRANCH_NAME --data encryptionMode=client --data mode=MODE
```

### 多模式打包（例如：lds 和 wv）
```bash
curl -X POST "JENKINS_URL/buildWithParameters" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6" --data branchName=BRANCH_NAME --data encryptionMode=client --data "mode=lds" --data "mode=wv"
```

### 获取构建号
**推荐方式：在触发构建前获取 nextBuildNumber（最可靠）**

```bash
# 方式1：使用 sed 提取构建号（最简单，Windows bash 可用）
BUILD_NUMBER=$(curl -s "JENKINS_URL/api/json?tree=nextBuildNumber" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6" | sed -n 's/.*"nextBuildNumber":\([0-9]*\).*/\1/p')

# 方式2：使用 Python 解析 JSON（如果 Python 可用，更可靠）
BUILD_NUMBER=$(curl -s "JENKINS_URL/api/json?tree=nextBuildNumber" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6" | python -c "import sys, json; print(json.load(sys.stdin)['nextBuildNumber'])")

# 方式3：使用 Node.js 解析 JSON（如果 Node.js 可用）
BUILD_NUMBER=$(curl -s "JENKINS_URL/api/json?tree=nextBuildNumber" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6" | node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).nextBuildNumber)")

# 然后触发构建
curl -X POST "JENKINS_URL/buildWithParameters" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6" --data branchName=BRANCH_NAME --data encryptionMode=client --data "mode=lds" --data "mode=wv"

# 使用获取到的 BUILD_NUMBER
echo "构建号: $BUILD_NUMBER"
```

**备选方式：触发构建后查询最新构建号**
```bash
# 如果构建已触发，等待几秒后查询最新构建号
sleep 3
LATEST_BUILD=$(curl -s "JENKINS_URL/api/json?tree=builds[number]" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6")

# 使用 Python 解析（推荐）
BUILD_NUMBER=$(echo $LATEST_BUILD | python -c "import sys, json; print(json.load(sys.stdin)['builds'][0]['number'])")

# 或使用 sed 提取第一个 number
BUILD_NUMBER=$(echo $LATEST_BUILD | sed -n 's/.*"number":\([0-9]*\).*/\1/p' | head -1)

# 返回格式: {"builds":[{"number":13},{"number":12},...]}
```

### 获取构建状态
```bash
# 获取构建详细信息（包括状态、结果等）
curl -s "JENKINS_URL/BUILD_NUMBER/api/json?tree=building,result,url,duration,timestamp" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6"

# 字段说明：
# - building: true/false - 是否正在构建
# - result: SUCCESS/FAILURE/ABORTED/null - 构建结果（null表示还在构建中）
# - url: 构建页面URL
# - duration: 构建耗时（毫秒）
# - timestamp: 构建开始时间戳（毫秒）
```

### 查看构建控制台输出
```bash
# 获取完整控制台输出
curl -s "JENKINS_URL/BUILD_NUMBER/consoleText" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6"

# 获取最后N行输出（例如最后100行）
curl -s "JENKINS_URL/BUILD_NUMBER/consoleText" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6" | tail -n 100

# 实时监控控制台输出（轮询方式）
# 注意：需要循环查询，每次获取新的行数
```

### 监控构建状态（轮询）
```bash
# 轮询构建状态直到完成
BUILD_NUMBER=13
while true; do
  STATUS=$(curl -s "JENKINS_URL/$BUILD_NUMBER/api/json?tree=building,result" --user "pc_wangliuyuan:1127b37ac87bd3b5622d80cf4e621078b6")
  BUILDING=$(echo $STATUS | grep -o '"building":[^,]*' | cut -d: -f2)
  RESULT=$(echo $STATUS | grep -o '"result":"[^"]*"' | cut -d'"' -f4)
  
  if [ "$BUILDING" = "false" ]; then
    if [ "$RESULT" = "SUCCESS" ]; then
      echo "构建成功！"
    else
      echo "构建失败：$RESULT"
    fi
    break
  fi
  
  echo "构建中..."
  sleep 5
done
```

## 使用流程
1. 执行打包前检查（git status、分支一致性）
2. 用户选择打包模式
3. **先获取构建号**：查询 `nextBuildNumber` 获取即将触发的构建号
4. **触发构建**：使用获取到的构建号（或触发后等待几秒再查询最新构建号）
5. 轮询构建状态直到完成，显示最终结果（构建链接）
6. 询问用户是否需要查看构建控制台输出
   - 如果选择是：获取并显示控制台输出（可选择完整输出或最后N行）

**注意**：推荐在触发构建前获取 `nextBuildNumber`，这样更可靠且不需要等待。如果构建已触发，可以等待 2-3 秒后查询最新构建列表获取构建号。